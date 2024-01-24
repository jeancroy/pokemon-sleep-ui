import {describe, expect, it} from '@jest/globals';

import {getStaminaAfterDuration} from '@/utils/game/stamina/depletion';


describe('Stamina / Depletion', () => {
  it('depletes from full', () => {
    expect(getStaminaAfterDuration({start: 100, duration: 600}).inGame).toBe(99);
    expect(getStaminaAfterDuration({start: 100, duration: 600}).actual).toBe(99);
    expect(getStaminaAfterDuration({start: 100, duration: 4200}).inGame).toBe(93);
    expect(getStaminaAfterDuration({start: 100, duration: 4200}).actual).toBe(93);
    expect(getStaminaAfterDuration({start: 100, duration: 30000}).inGame).toBe(50);
    expect(getStaminaAfterDuration({start: 100, duration: 30000}).actual).toBe(50);
  });

  it('depletes to 0', () => {
    expect(getStaminaAfterDuration({start: 26, duration: 27600}).inGame).toBe(0);
    expect(getStaminaAfterDuration({start: 26, duration: 27600}).actual).toBe(-20);
  });

  it('depletes from 0', () => {
    expect(getStaminaAfterDuration({start: 0, duration: 600}).inGame).toBe(0);
    expect(getStaminaAfterDuration({start: 0, duration: 600}).actual).toBe(-1);
  });
});
