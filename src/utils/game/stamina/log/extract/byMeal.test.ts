import {describe, expect, it} from '@jest/globals';

import {efficiencyBeforeBreakPoint} from '@/const/game/efficiency';
import {extractEfficiencyIntervalsByCookingMeal} from '@/utils/game/stamina/log/extract/byMeal';


describe('Stamina (Extract Intervals) / By Meal', () => {
  it('is correct', () => {
    const intervals = extractEfficiencyIntervalsByCookingMeal({
      logs: [
        {
          type: 'wakeup',
          timing: 0,
          stamina: {before: 122, after: 122},
          staminaUnderlying: {before: 122, after: 122},
        },
        {
          type: 'cookingRecovery',
          timing: 7200,
          stamina: {before: 110, after: 110},
          staminaUnderlying: {before: 110, after: 110},
        },
        {
          type: 'efficiencyBlock',
          timing: 25200,
          stamina: {before: 80, after: 80},
          staminaUnderlying: {before: 80, after: 80},
        },
        {
          type: 'cookingRecovery',
          timing: 28800,
          stamina: {before: 74, after: 76},
          staminaUnderlying: {before: 74, after: 76},
        },
        {
          type: 'efficiencyBlock',
          timing: 38400,
          stamina: {before: 60, after: 60},
          staminaUnderlying: {before: 60, after: 60},
        },
        {
          type: 'efficiencyBlock',
          timing: 50400,
          stamina: {before: 40, after: 40},
          staminaUnderlying: {before: 40, after: 40},
        },
        {
          type: 'cookingRecovery',
          timing: 54000,
          stamina: {before: 34, after: 38},
          staminaUnderlying: {before: 34, after: 38},
        },
        {
          type: 'sleep',
          timing: 57600,
          stamina: {before: 32, after: 32},
          staminaUnderlying: {before: 32, after: 32},
        },
        {
          type: 'efficiencyBlock',
          timing: 64800,
          stamina: {before: 20, after: 20},
          staminaUnderlying: {before: 20, after: 20},
        },
        {
          type: 'efficiencyBlock',
          timing: 76800,
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

    expect(intervals.breakfast).toHaveLength(2);
    expect(intervals.breakfast[0].efficiency).toBe(efficiencyBeforeBreakPoint[80]);
    expect(intervals.breakfast[0].duration).toBe(7200);
    expect(intervals.breakfast[1].efficiency).toBe(efficiencyBeforeBreakPoint[20]);
    expect(intervals.breakfast[1].duration).toBe(3600);
    expect(intervals.lunch).toHaveLength(2);
    expect(intervals.lunch[0].efficiency).toBe(efficiencyBeforeBreakPoint[80]);
    expect(intervals.lunch[0].duration).toBe(18000);
    expect(intervals.lunch[1].efficiency).toBe(efficiencyBeforeBreakPoint[60]);
    expect(intervals.lunch[1].duration).toBe(3600);
    expect(intervals.dinner).toHaveLength(3);
    expect(intervals.dinner[0].efficiency).toBe(efficiencyBeforeBreakPoint[60]);
    expect(intervals.dinner[0].duration).toBe(9600);
    expect(intervals.dinner[1].efficiency).toBe(efficiencyBeforeBreakPoint[40]);
    expect(intervals.dinner[1].duration).toBe(12000);
    expect(intervals.dinner[2].efficiency).toBe(efficiencyBeforeBreakPoint[20]);
    expect(intervals.dinner[2].duration).toBe(3600);
  });
});
