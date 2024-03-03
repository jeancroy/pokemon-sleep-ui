import {describe, expect, it} from '@jest/globals';

import {efficiencyBeforeBreakPoint} from '@/const/game/efficiency';
import {extractEfficiencyIntervalsDuringSleep} from '@/utils/game/stamina/log/extract/sleep';


describe('Stamina (Extract Intervals) / Sleep', () => {
  it('extracts intervals with primary session only', () => {
    const intervals = extractEfficiencyIntervalsDuringSleep({
      hasSecondary: false,
      logs: [
        {
          type: 'wakeup',
          timing: 0,
          stamina: {before: 122, after: 122},
          staminaUnderlying: {before: 122, after: 122},
        },
        {
          type: 'efficiencyBlock',
          timing: 25200,
          stamina: {before: 80, after: 80},
          staminaUnderlying: {before: 80, after: 80},
        },
        {
          type: 'efficiencyBlock',
          timing: 37200,
          stamina: {before: 60, after: 60},
          staminaUnderlying: {before: 60, after: 60},
        },
        {
          type: 'efficiencyBlock',
          timing: 49200,
          stamina: {before: 40, after: 40},
          staminaUnderlying: {before: 40, after: 40},
        },
        {
          type: 'sleep',
          timing: 57600,
          stamina: {before: 26, after: 26},
          staminaUnderlying: {before: 26, after: 26},
        },
        {
          type: 'efficiencyBlock',
          timing: 61200,
          stamina: {before: 20, after: 20},
          staminaUnderlying: {before: 20, after: 20},
        },
        {
          type: 'efficiencyBlock',
          timing: 73200,
          stamina: {before: 0, after: 0},
          staminaUnderlying: {before: 0, after: 0},
        },
        {
          type: 'endOfPeriod',
          timing: 86400,
          stamina: {before: 0, after: 0},
          staminaUnderlying: {before: 0, after: 0},
        },
      ],
    });

    expect(intervals.primary).toHaveLength(3);
    expect(intervals.primary[0].efficiency).toBe(efficiencyBeforeBreakPoint[20]);
    expect(intervals.primary[0].duration).toBe(3600);
    expect(intervals.primary[1].efficiency).toBe(efficiencyBeforeBreakPoint[0]);
    expect(intervals.primary[1].duration).toBe(12000);
    expect(intervals.primary[2].efficiency).toBe(efficiencyBeforeBreakPoint[0]);
    expect(intervals.primary[2].duration).toBe(13200);
    expect(intervals.secondary).toBeNull();
  });

  it('extracts intervals with dual sessions', () => {
    const intervals = extractEfficiencyIntervalsDuringSleep({
      hasSecondary: true,
      logs: [
        {
          type: 'wakeup',
          timing: 0,
          stamina: {before: 4, after: 100},
          staminaUnderlying: {before: 4, after: 100},
        },
        {
          type: 'efficiencyBlock',
          timing: 12000,
          stamina: {before: 80, after: 80},
          staminaUnderlying: {before: 80, after: 80},
        },
        {
          type: 'skillRecovery',
          timing: 19200,
          stamina: {before: 68, after: 86},
          staminaUnderlying: {before: 68, after: 86},
        },
        {
          type: 'efficiencyBlock',
          timing: 22800,
          stamina: {before: 80, after: 80},
          staminaUnderlying: {before: 80, after: 80},
        },
        {
          type: 'sleep',
          timing: 34200,
          stamina: {before: 61, after: 61},
          staminaUnderlying: {before: 61, after: 61},
        },
        {
          type: 'efficiencyBlock',
          timing: 34800,
          stamina: {before: 60, after: 60},
          staminaUnderlying: {before: 60, after: 60},
        },
        {
          type: 'wakeup',
          timing: 39600,
          stamina: {before: 52, after: 70},
          staminaUnderlying: {before: 52, after: 70},
        },
        {
          type: 'efficiencyBlock',
          timing: 45600,
          stamina: {before: 60, after: 60},
          staminaUnderlying: {before: 60, after: 60},
        },
        {
          type: 'efficiencyBlock',
          timing: 57600,
          stamina: {before: 40, after: 40},
          staminaUnderlying: {before: 40, after: 40},
        },
        {
          type: 'sleep',
          timing: 60000,
          stamina: {before: 36, after: 36},
          staminaUnderlying: {before: 36, after: 36},
        },
        {
          type: 'efficiencyBlock',
          timing: 69600,
          stamina: {before: 20, after: 20},
          staminaUnderlying: {before: 20, after: 20},
        },
        {
          type: 'efficiencyBlock',
          timing: 81600,
          stamina: {before: 0, after: 0},
          staminaUnderlying: {before: 0, after: 0},
        },
        {
          type: 'endOfPeriod',
          timing: 86400,
          stamina: {before: 0, after: 0},
          staminaUnderlying: {before: 0, after: 0},
        },
      ],
    });

    expect(intervals.primary).toHaveLength(3);
    expect(intervals.primary[0].efficiency).toBe(efficiencyBeforeBreakPoint[20]);
    expect(intervals.primary[0].duration).toBe(9600);
    expect(intervals.primary[1].efficiency).toBe(efficiencyBeforeBreakPoint[0]);
    expect(intervals.primary[1].duration).toBe(12000);
    expect(intervals.primary[2].efficiency).toBe(efficiencyBeforeBreakPoint[0]);
    expect(intervals.primary[2].duration).toBe(4800);
    expect(intervals.secondary).toHaveLength(2);
    expect(intervals.secondary?.at(0)?.efficiency).toBe(efficiencyBeforeBreakPoint[60]);
    expect(intervals.secondary?.at(0)?.duration).toBe(600);
    expect(intervals.secondary?.at(1)?.efficiency).toBe(efficiencyBeforeBreakPoint[40]);
    expect(intervals.secondary?.at(1)?.duration).toBe(4800);
  });
});
