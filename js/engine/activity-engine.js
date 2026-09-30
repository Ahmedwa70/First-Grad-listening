/*
 * Professional Learning Activity Engine — Core v1
 * Offline-first, framework-agnostic, browser-safe.
 *
 * This file intentionally contains no DOM, CSS, lesson-specific data,
 * or stage-specific knowledge. It exposes a small global API for the
 * current HTML runtime and can later be wrapped by Vue/TypeScript.
 */
(function (root) {
  'use strict';

  const VERSION = '1.0.0';
  const DEFAULT_HISTORY_LIMIT = 40;

  function clone(value) {
    if (value === undefined) return undefined;
    return JSON.parse(JSON.stringify(value));
  }

  function now() {
    return new Date().toISOString();
  }

  function assert(condition, message) {
    if (!condition) throw new Error(`[ActivityEngine] ${message}`);
  }

  function normalizeDefinition(definition) {
    assert(definition && typeof definition === 'object', 'Activity definition is required');
    assert(typeof definition.id === 'string' && definition.id.length > 0, 'Definition id is required');
    assert(Number.isInteger(definition.version), `${definition.id}: integer version is required`);
    assert(typeof definition.pedagogicalGoal === 'string' && definition.pedagogicalGoal.length > 0,
      `${definition.id}: pedagogicalGoal is required`);
    assert(typeof definition.createInitialState === 'function', `${definition.id}: createInitialState is required`);
    assert(typeof definition.reduce === 'function', `${definition.id}: reduce is required`);
    assert(typeof definition.getViewModel === 'function', `${definition.id}: getViewModel is required`);
    assert(typeof definition.validateContent === 'function', `${definition.id}: validateContent is required`);
    assert(definition.commands && typeof definition.commands === 'object', `${definition.id}: commands are required`);
    assert(definition.events && typeof definition.events === 'object', `${definition.id}: events are required`);
    return Object.freeze(definition);
  }

  class ActivityInstance {
    constructor(definition, content, options) {
      this.definition = definition;
      this.content = content;
      this.options = Object.assign({ historyLimit: DEFAULT_HISTORY_LIMIT }, options || {});
      this.instanceId = this.options.instanceId || `${definition.id}:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`;
      this.listeners = new Set();
      this.history = [];
      this.events = [];
      this.state = clone(definition.createInitialState(content, this.options));
      this.destroyed = false;
      this._emit('activity.created', { state: this.state }, 'system');
    }

    _assertAlive() {
      assert(!this.destroyed, `${this.instanceId}: instance has been destroyed`);
    }

    _snapshot() {
      const view = this.definition.getViewModel(this.state, this.content, this.options);
      return Object.freeze({
        engineVersion: VERSION,
        activityId: this.definition.id,
        activityVersion: this.definition.version,
        instanceId: this.instanceId,
        status: this.state.status || 'active',
        state: this.state.phase || this.state.state || null,
        data: clone(view),
        availableCommands: Object.keys(this.definition.commands).filter(command =>
          this._can(command, false)
        ),
        canUndo: this.history.length > 0,
        lastEvent: this.events.length ? clone(this.events[this.events.length - 1]) : null
      });
    }

    getSnapshot() {
      this._assertAlive();
      return this._snapshot();
    }

    _can(command, throwOnError) {
      const rule = this.definition.commands[command];
      if (!rule) {
        if (throwOnError) throw new Error(`${this.definition.id}: unsupported command ${command}`);
        return false;
      }
      const allowedIn = rule.allowedIn || ['*'];
      const current = this.state.phase || this.state.state || '*';
      const allowed = allowedIn.includes('*') || allowedIn.includes(current);
      if (!allowed && throwOnError) {
        throw new Error(`${this.definition.id}: ${command} is not allowed in ${current}`);
      }
      return allowed;
    }

    can(command) {
      this._assertAlive();
      return this._can(command, false);
    }

    dispatch(command, payload) {
      this._assertAlive();
      assert(typeof command === 'string' && command.length > 0, 'Command is required');
      this._can(command, true);

      const previous = clone(this.state);
      const result = this.definition.reduce({
        state: clone(this.state),
        command,
        payload: clone(payload),
        content: this.content,
        options: this.options,
        instance: this
      });
      assert(result && typeof result === 'object', `${this.definition.id}: reducer must return a state object`);

      this.history.push(previous);
      if (this.history.length > this.options.historyLimit) this.history.shift();
      this.state = clone(result);
      this._emit(this._eventFor(command), { command, payload: payload || {} }, 'teacher');
      this._notify();
      return this.getSnapshot();
    }

    _eventFor(command) {
      const rule = this.definition.commands[command];
      return rule && rule.event ? rule.event : 'activity.command';
    }

    undo() {
      this._assertAlive();
      assert(this.history.length > 0, `${this.definition.id}: nothing to undo`);
      this.state = this.history.pop();
      this._emit('activity.undone', { state: this.state }, 'teacher');
      this._notify();
      return this.getSnapshot();
    }

    reset() {
      this._assertAlive();
      this.history = [];
      this.state = clone(this.definition.createInitialState(this.content, this.options));
      this._emit('activity.reset', { state: this.state }, 'teacher');
      this._notify();
      return this.getSnapshot();
    }

    record(type, payload, source) {
      this._assertAlive();
      assert(this.definition.events[type] || type.indexOf('activity.') === 0,
        `${this.definition.id}: undeclared event ${type}`);
      this._emit(type, payload || {}, source || 'teacher');
      this._notify();
      return this.getSnapshot();
    }

    _emit(type, payload, source) {
      const event = Object.freeze({
        type,
        activityId: this.definition.id,
        instanceId: this.instanceId,
        timestamp: now(),
        source,
        payload: clone(payload || {})
      });
      this.events.push(event);
    }

    getEvents() {
      this._assertAlive();
      return clone(this.events);
    }

    subscribe(listener) {
      this._assertAlive();
      assert(typeof listener === 'function', 'Subscriber must be a function');
      this.listeners.add(listener);
      listener(this.getSnapshot());
      return () => this.listeners.delete(listener);
    }

    _notify() {
      const snapshot = this.getSnapshot();
      this.listeners.forEach(listener => listener(snapshot));
    }

    destroy() {
      this.listeners.clear();
      this.destroyed = true;
    }
  }

  class ActivityEngine {
    constructor(options) {
      this.options = options || {};
      this.registry = new Map();
      this.instances = new Map();
    }

    register(definition) {
      const normalized = normalizeDefinition(definition);
      assert(!this.registry.has(normalized.id), `Duplicate activity definition: ${normalized.id}`);
      this.registry.set(normalized.id, normalized);
      return normalized.id;
    }

    has(activityId) {
      return this.registry.has(activityId);
    }

    getDefinition(activityId) {
      return this.registry.get(activityId) || null;
    }

    create(activityId, content, options) {
      const definition = this.getDefinition(activityId);
      assert(definition, `Unknown activity: ${activityId}`);
      const validation = definition.validateContent(content, options || {});
      assert(validation === true, `${activityId}: invalid content${validation && validation.message ? ` — ${validation.message}` : ''}`);
      const instance = new ActivityInstance(definition, clone(content), options || {});
      this.instances.set(instance.instanceId, instance);
      return instance;
    }

    getInstance(instanceId) {
      return this.instances.get(instanceId) || null;
    }

    destroy(instanceId) {
      const instance = this.getInstance(instanceId);
      if (!instance) return false;
      instance.destroy();
      this.instances.delete(instanceId);
      return true;
    }

    listActivities() {
      return Array.from(this.registry.values()).map(definition => ({
        id: definition.id,
        version: definition.version,
        category: definition.category || null,
        pedagogicalGoal: definition.pedagogicalGoal
      }));
    }
  }

  const api = {
    VERSION,
    ActivityEngine,
    ActivityInstance,
    createEngine(options) { return new ActivityEngine(options); },
    validateDefinition: normalizeDefinition
  };

  root.LearningActivityEngine = Object.freeze(api);
})(typeof window !== 'undefined' ? window : globalThis);
