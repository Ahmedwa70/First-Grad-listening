/*
 * P6 D2 Strangler Bridge v1.
 * Converts legacy D2 content into same-or-different.v1 without changing
 * lesson data or the current P6 renderer.
 */
(function (root) {
  'use strict';

  function assert(condition, message) {
    if (!condition) throw new Error(`[P6D2Bridge] ${message}`);
  }

  function toActivityContent(round) {
    assert(round && round.type === 'sameordiff', 'A sameordiff round is required');
    assert(Array.isArray(round.pairs) && round.pairs.length > 0, 'D2 round must contain pairs');

    return {
      sourceRoundId: round.id,
      instruction: round.instruction,
      items: round.pairs.map((pair, index) => {
        const same = !!pair.same;
        return {
          id: `${round.id || 'd2'}-item-${index + 1}`,
          leftAudio: pair.playIds[0],
          rightAudio: pair.playIds[1],
          expectedResponse: same ? 'same' : 'different',
          legacyIndex: index,
          legacyPair: pair
        };
      })
    };
  }

  function createForRound(round, options) {
    assert(root.ACTIVITY_ENGINE, 'ACTIVITY_ENGINE is not available');
    const content = toActivityContent(round);
    const instance = root.ACTIVITY_ENGINE.create('same-or-different.v1', content, options || {});
    instance.dispatch('START');
    return instance;
  }

  root.P6D2Bridge = Object.freeze({
    version: '1.0.0',
    activityId: 'same-or-different.v1',
    toActivityContent,
    createForRound
  });
})(typeof window !== 'undefined' ? window : globalThis);
