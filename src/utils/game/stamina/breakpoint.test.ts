import {describe, expect, it} from '@jest/globals';

import {getStaminaBreakpoint} from '@/utils/game/stamina/breakpoint';


describe('Stamina / Breakpoint', () => {
  it('is correct', () => {
    expect(getStaminaBreakpoint(110)).toBe(80);
    expect(getStaminaBreakpoint(100)).toBe(80);
    expect(getStaminaBreakpoint(90)).toBe(80);
    expect(getStaminaBreakpoint(80)).toBe(60);
    expect(getStaminaBreakpoint(70)).toBe(60);
    expect(getStaminaBreakpoint(60)).toBe(40);
    expect(getStaminaBreakpoint(50)).toBe(40);
    expect(getStaminaBreakpoint(40)).toBe(20);
    expect(getStaminaBreakpoint(30)).toBe(20);
    expect(getStaminaBreakpoint(20)).toBe(0);
    expect(getStaminaBreakpoint(10)).toBe(0);
  });
});
