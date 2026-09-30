/*
 * Reusable activity definitions v1.
 * Definitions contain learning rules only; no DOM, CSS, lesson IDs, or stage logic.
 */
(function (root) {
  'use strict';

  const Engine = root.LearningActivityEngine;
  if (!Engine) throw new Error('activity-engine.js must load before activity-definitions.js');

  const commonEvents = {
    'activity.created': true,
    'activity.started': true,
    'activity.command': true,
    'activity.undone': true,
    'activity.reset': true,
    'activity.completed': true,
    'item.presented': true,
    'audio.played': true,
    'answer.revealed': true,
    'item.repeated': true,
    'student.response-observed': true,
    'teacher.marked-needs-review': true
  };

  function validItems(content) {
    return !!(content && Array.isArray(content.items) && content.items.length > 0);
  }

  function baseDefinition(config) {
    return Object.assign({
      version: 1,
      phaseUsage: [],
      validateContent: validItems,
      events: commonEvents
    }, config);
  }

  function itemState(items, phase) {
    return { status: 'active', phase, itemIndex: 0, itemCount: items.length, revealLevel: 0, reviewed: 0, needsReview: [] };
  }

  function nextItem(state) {
    const next = Object.assign({}, state, {
      revealLevel: 0,
      phase: 'active',
      response: null,
      studentChoice: null,
      outcome: 'unobserved'
    });
    if (state.itemIndex < state.itemCount - 1) {
      next.itemIndex += 1;
      next.reviewed = Math.max(state.reviewed, state.itemIndex + 1);
      return next;
    }
    next.reviewed = state.itemCount;
    next.status = 'completed';
    next.phase = 'completed';
    return next;
  }

  const auditoryIdentify = baseDefinition({
    id: 'auditory-identify.v1',
    category: 'auditory-discrimination',
    pedagogicalGoal: 'يميز الطالب الصوت المسموع ويربطه بالحرف بعد الاستجابة.',
    phaseUsage: ['P2', 'P3', 'P6'],
    commands: {
      START: { allowedIn: ['ready'], event: 'activity.started' },
      PLAY_AUDIO: { allowedIn: ['ready', 'active', 'response'], event: 'audio.played' },
      OBSERVE_RESPONSE: { allowedIn: ['active', 'response'], event: 'student.response-observed' },
      REVEAL: { allowedIn: ['response', 'active'], event: 'answer.revealed' },
      NEXT: { allowedIn: ['reveal', 'active', 'response'], event: 'item.presented' },
      MARK_REVIEW: { allowedIn: ['active', 'response', 'reveal'], event: 'teacher.marked-needs-review' }
    },
    validateContent(content) {
      return validItems(content) && content.items.every(item => item.id && item.audioRef);
    },
    createInitialState(content) { return itemState(content.items, 'ready'); },
    reduce({ state, command, payload, content }) {
      const next = Object.assign({}, state);
      if (command === 'START') next.phase = 'active';
      if (command === 'PLAY_AUDIO') next.phase = 'response';
      if (command === 'OBSERVE_RESPONSE') next.response = payload || {};
      if (command === 'REVEAL') { next.phase = 'reveal'; next.revealLevel = Math.max(1, next.revealLevel + 1); }
      if (command === 'MARK_REVIEW') next.needsReview = state.needsReview.concat(content.items[state.itemIndex].id);
      if (command === 'NEXT') return nextItem(next);
      return next;
    },
    getViewModel(state, content) {
      const item = content.items[state.itemIndex];
      return { state: Object.assign({}, state), currentItem: item, progress: { completed: state.reviewed, total: state.itemCount, ratio: state.itemCount ? state.reviewed / state.itemCount : 0 } };
    }
  });

  const sameOrDifferent = baseDefinition({
    id: 'same-or-different.v1',
    category: 'auditory-discrimination',
    pedagogicalGoal: 'يميز الطالب سمعياً ما إذا كان الصوتان متماثلين أو مختلفين.',
    phaseUsage: ['P2', 'P6'],
    requiredData: {
      items: { type: 'array', min: 1 },
      leftAudio: { type: 'string' },
      rightAudio: { type: 'string' },
      expectedResponse: { type: 'string', values: ['same', 'different'] }
    },
    states: {
      READY: 'ready',
      ACTIVE: 'active',
      RESPONSE: 'response',
      REVEAL: 'reveal',
      COMPLETED: 'completed'
    },
    teacherActions: {
      START: { allowedIn: ['ready'], reversible: false },
      PLAY_FIRST: { allowedIn: ['active', 'response'], reversible: false },
      PLAY_SECOND: { allowedIn: ['active', 'response'], reversible: false },
      OBSERVE_RESPONSE: { allowedIn: ['response', 'active'], reversible: true },
      REVEAL: { allowedIn: ['response', 'active'], reversible: true },
      NEXT: { allowedIn: ['reveal'], reversible: true },
      RESET: { allowedIn: ['*'], reversible: false }
    },
    studentResponse: {
      mode: 'choice',
      inputTypes: ['same', 'different', 'choral-gesture'],
      required: false,
      capture: 'teacher-observation'
    },
    successCriteria: {
      type: 'hybrid',
      metric: 'response-matches-expected',
      threshold: 1
    },
    completionCondition: {
      type: 'all-items-reviewed',
      requiresTeacherConfirmation: false
    },
    commands: {
      START: { allowedIn: ['ready'], event: 'activity.started' },
      PRESENT: { allowedIn: ['ready', 'active', 'response', 'reveal'], event: 'item.presented' },
      PLAY_FIRST: { allowedIn: ['active', 'response'], event: 'audio.played' },
      PLAY_SECOND: { allowedIn: ['active', 'response'], event: 'audio.played' },
      OBSERVE_RESPONSE: { allowedIn: ['response', 'active'], event: 'student.response-observed' },
      REVEAL: { allowedIn: ['response', 'active'], event: 'answer.revealed' },
      NEXT: { allowedIn: ['reveal'], event: 'item.presented' },
      RESET: { allowedIn: ['*'], event: 'activity.reset' },
      MARK_REVIEW: { allowedIn: ['response', 'reveal'], event: 'teacher.marked-needs-review' }
    },
    validateContent(content) {
      return validItems(content) && content.items.every(item =>
        item.id && item.leftAudio && item.rightAudio &&
        (item.expectedResponse === 'same' || item.expectedResponse === 'different')
      );
    },
    createInitialState(content) {
      return Object.assign(itemState(content.items, 'ready'), {
        studentChoice: null,
        outcome: 'unobserved',
        correctCount: 0,
        incorrectCount: 0
      });
    },
    reduce({ state, command, payload, content }) {
      if (command === 'RESET') {
        return Object.assign(itemState(content.items, 'ready'), {
          studentChoice: null,
          outcome: 'unobserved',
          correctCount: 0,
          incorrectCount: 0
        });
      }
      const next = Object.assign({}, state);
      const item = content.items[state.itemIndex];
      if (command === 'START') next.phase = 'active';
      if (command === 'PRESENT') {
        next.itemIndex = Math.max(0, Math.min(content.items.length - 1, Number(payload && payload.index) || 0));
        next.phase = 'active';
        next.revealLevel = 0;
        next.studentChoice = null;
        next.outcome = 'unobserved';
      }
      if (command === 'PLAY_FIRST' || command === 'PLAY_SECOND') next.phase = 'response';
      if (command === 'OBSERVE_RESPONSE') {
        const choice = payload && (payload.choice || payload.value);
        next.phase = 'response';
        next.studentChoice = choice || null;
        next.outcome = choice === item.expectedResponse ? 'correct' : choice ? 'incorrect' : 'unobserved';
        if (next.outcome === 'correct') next.correctCount = state.correctCount + 1;
        if (next.outcome === 'incorrect') next.incorrectCount = state.incorrectCount + 1;
      }
      if (command === 'REVEAL') { next.phase = 'reveal'; next.revealLevel = 1; }
      if (command === 'MARK_REVIEW') next.needsReview = state.needsReview.concat(item.id);
      if (command === 'NEXT') return nextItem(next);
      return next;
    },
    getViewModel(state, content) {
      const item = content.items[state.itemIndex];
      return {
        state: Object.assign({}, state),
        currentItem: item,
        expectedResponse: item.expectedResponse,
        outcome: state.outcome,
        progress: { completed: state.reviewed, total: state.itemCount, ratio: state.itemCount ? state.reviewed / state.itemCount : 0 }
      };
    }
  });

  const closeSoundCompare = baseDefinition({
    id: 'close-sound-compare.v1',
    category: 'auditory-discrimination',
    pedagogicalGoal: 'يقارن الطالب بين أصوات عربية متقاربة قبل الاعتماد على الشكل المكتوب.',
    phaseUsage: ['P2', 'P3', 'P6'],
    commands: {
      START: { allowedIn: ['ready'], event: 'activity.started' },
      PLAY_SEQUENCE: { allowedIn: ['active', 'response'], event: 'audio.played' },
      OBSERVE_RESPONSE: { allowedIn: ['response', 'active'], event: 'student.response-observed' },
      REVEAL: { allowedIn: ['response', 'active'], event: 'answer.revealed' },
      NEXT: { allowedIn: ['reveal', 'response'], event: 'item.presented' }
    },
    validateContent(content) { return validItems(content) && content.items.every(item => Array.isArray(item.audioRefs) && item.audioRefs.length >= 2); },
    createInitialState(content) { return itemState(content.items, 'ready'); },
    reduce({ state, command, payload }) {
      const next = Object.assign({}, state);
      if (command === 'START') next.phase = 'active';
      if (command === 'PLAY_SEQUENCE') next.phase = 'response';
      if (command === 'OBSERVE_RESPONSE') next.response = payload || {};
      if (command === 'REVEAL') { next.phase = 'reveal'; next.revealLevel = 1; }
      if (command === 'NEXT') return nextItem(next);
      return next;
    },
    getViewModel(state, content) { return { state: Object.assign({}, state), currentItem: content.items[state.itemIndex], progress: { completed: state.reviewed, total: state.itemCount } }; }
  });

  const rapidRetrieval = baseDefinition({
    id: 'rapid-retrieval.v1',
    category: 'retrieval',
    pedagogicalGoal: 'يسترجع الطالب الحروف والكلمات بسرعة وباستجابة جماعية آمنة.',
    phaseUsage: ['P6'],
    commands: {
      START: { allowedIn: ['ready', 'paused'], event: 'activity.started' },
      PAUSE: { allowedIn: ['running'], event: 'activity.paused' },
      PRESENT: { allowedIn: ['running'], event: 'item.presented' },
      MARK_REVIEW: { allowedIn: ['running', 'paused'], event: 'teacher.marked-needs-review' },
      COMPLETE: { allowedIn: ['running', 'paused'], event: 'activity.completed' }
    },
    validateContent(content) { return validItems(content) && content.items.every(item => item.id && item.label); },
    createInitialState(content) { return { status: 'active', phase: 'ready', itemIndex: 0, itemCount: content.items.length, round: 1, roundCount: content.roundCount || 2, needsReview: [] }; },
    reduce({ state, command, payload, content }) {
      const next = Object.assign({}, state);
      if (command === 'START') next.phase = 'running';
      if (command === 'PAUSE') next.phase = 'paused';
      if (command === 'PRESENT') next.itemIndex = typeof payload.index === 'number' ? payload.index : state.itemIndex;
      if (command === 'MARK_REVIEW') next.needsReview = state.needsReview.concat(content.items[state.itemIndex].id);
      if (command === 'COMPLETE') { next.phase = 'completed'; next.status = 'completed'; }
      return next;
    },
    getViewModel(state, content) { return { state: Object.assign({}, state), currentItem: content.items[state.itemIndex], progress: { completed: state.itemIndex, total: state.itemCount } }; }
  });

  const silentDictation = baseDefinition({
    id: 'silent-dictation.v1',
    category: 'written-assessment',
    pedagogicalGoal: 'يحوّل الطالب الصوت المسموع إلى كتابة مستقلة ثم يصحح نفسه بالكشف.',
    phaseUsage: ['P6'],
    commands: {
      START: { allowedIn: ['ready'], event: 'activity.started' },
      PLAY_PROMPT: { allowedIn: ['writing', 'listening'], event: 'audio.played' },
      BEGIN_WRITING: { allowedIn: ['listening'], event: 'activity.command' },
      REVEAL: { allowedIn: ['writing'], event: 'answer.revealed' },
      COMPLETE_ITEM: { allowedIn: ['self-check', 'reveal'], event: 'item.presented' }
    },
    validateContent(content) { return validItems(content) && content.items.every(item => item.audioRef && item.answer); },
    createInitialState(content) { return itemState(content.items, 'ready'); },
    reduce({ state, command }) {
      const next = Object.assign({}, state);
      if (command === 'START') next.phase = 'listening';
      if (command === 'PLAY_PROMPT') next.phase = 'writing';
      if (command === 'BEGIN_WRITING') next.phase = 'writing';
      if (command === 'REVEAL') { next.phase = 'self-check'; next.revealLevel = 1; }
      if (command === 'COMPLETE_ITEM') return nextItem(next);
      return next;
    },
    getViewModel(state, content) { return { state: Object.assign({}, state), currentItem: content.items[state.itemIndex], progress: { completed: state.reviewed, total: state.itemCount } }; }
  });

  const sentenceProduction = baseDefinition({
    id: 'sentence-production.v1',
    category: 'oral-production',
    pedagogicalGoal: 'ينتج الطالب جملة عربية قصيرة شفهياً، مستقلاً أو مع دعم تدريجي.',
    phaseUsage: ['P5', 'P6'],
    commands: {
      START: { allowedIn: ['ready'], event: 'activity.started' },
      SELECT_STUDENT: { allowedIn: ['ready', 'prompting', 'support'], event: 'student.response-observed' },
      PROMPT: { allowedIn: ['ready', 'student-selected'], event: 'activity.command' },
      SUPPORT: { allowedIn: ['prompting', 'support'], event: 'activity.command' },
      COMPLETE_STUDENT: { allowedIn: ['prompting', 'support'], event: 'student.response-observed' }
    },
    validateContent(content) { return validItems(content) && content.items.every(item => item.template && item.choices); },
    createInitialState(content) { return { status: 'active', phase: 'ready', itemIndex: 0, itemCount: content.items.length, supportLevel: 0, selectedStudent: null, completedStudents: [] }; },
    reduce({ state, command, payload }) {
      const next = Object.assign({}, state);
      if (command === 'START') next.phase = 'ready';
      if (command === 'SELECT_STUDENT') { next.selectedStudent = payload && payload.studentRef ? payload.studentRef : null; next.phase = 'student-selected'; next.supportLevel = 0; }
      if (command === 'PROMPT') next.phase = 'prompting';
      if (command === 'SUPPORT') { next.phase = 'support'; next.supportLevel = Math.min(2, state.supportLevel + 1); }
      if (command === 'COMPLETE_STUDENT') { next.phase = 'ready'; next.completedStudents = state.completedStudents.concat(payload && payload.studentRef ? payload.studentRef : `student-${state.completedStudents.length + 1}`); }
      return next;
    },
    getViewModel(state, content) { return { state: Object.assign({}, state), currentItem: content.items[state.itemIndex], progress: { completed: state.completedStudents.length, total: content.rosterSize || null } }; }
  });

  const definitions = [auditoryIdentify, sameOrDifferent, closeSoundCompare, rapidRetrieval, silentDictation, sentenceProduction];
  const engine = Engine.createEngine({ historyLimit: 40 });
  definitions.forEach(definition => engine.register(definition));

  root.LearningActivityDefinitions = Object.freeze(definitions);
  root.ACTIVITY_ENGINE = engine;
})(typeof window !== 'undefined' ? window : globalThis);
