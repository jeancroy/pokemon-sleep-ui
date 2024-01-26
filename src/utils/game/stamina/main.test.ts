import {describe, expect, it} from '@jest/globals';

import {StaminaCalcConfig} from '@/types/game/stamina/config';
import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {getSleepSessionInfo} from '@/utils/game/sleep';
import {getStaminaEfficiency, getStaminaEfficiencyMultiplierFromLogs} from '@/utils/game/stamina/main';


describe('Stamina Efficiency / From Config', () => {
  it('is correct', () => {
    const config: StaminaCalcConfig = {
      sleepSession: {
        primary: {
          start: 0, // 00:00
          end: 23400, // 06:30
        },
        secondary: {
          start: 59400, // 16:30
          end: 64800, // 18:00
        },
      },
      skillRecovery: {
        strategy: 'conservative',
      },
      recoveryRate: {
        general: 1,
        sleep: 1.14,
      },
    };
    const sessionInfo = getSleepSessionInfo({
      session: config.sleepSession,
      recoveryRate: config.recoveryRate,
    });
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 3, amount: 18},
    ];

    const {multiplier} = getStaminaEfficiency({config, sessionInfo, skillTriggers});

    // The expected value is just for checking if the calculation outcome somehow changes
    // Therefore if the test fails, once confirmed expected, then the expected value is good to update
    // > Actual test for multiplier calculation at below
    expect(multiplier.average).toBeCloseTo(1.811962);
  });

  it('is correct with multiple skill triggers', () => {
    const config: StaminaCalcConfig = {
      sleepSession: {
        primary: {
          start: 0, // 00:00
          end: 23400, // 06:30
        },
        secondary: {
          start: 46800, // 13:00
          end: 52200, // 14:30
        },
      },
      skillRecovery: {
        strategy: 'conservative',
      },
      recoveryRate: {
        general: 1,
        sleep: 1,
      },
    };
    const sessionInfo = getSleepSessionInfo({
      session: config.sleepSession,
      recoveryRate: config.recoveryRate,
    });
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 3, amount: 9},
      {dailyCount: 2, amount: 9},
    ];

    const {multiplier} = getStaminaEfficiency({config, sessionInfo, skillTriggers});

    // The expected value is just for checking if the calculation outcome somehow changes
    // Therefore if the test fails, once confirmed expected, then the expected value is good to update
    // > Actual test for multiplier calculation at below
    expect(multiplier.average).toBeCloseTo(1.551284);
  });
});

describe('Stamina Efficiency / From Logs', () => {
  it('is correctly handling secondary sleep', () => {
    const efficiency = getStaminaEfficiencyMultiplierFromLogs({
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

    // These values should not change if the test fails, unless there is an efficiency multiplier update
    expect(efficiency.average).toBeCloseTo(1.665815);
    expect(efficiency.sleep1).toBeCloseTo(1.148528);
    expect(efficiency.sleep2).toBeCloseTo(1.647367);
  });
});
