import {describe, expect, it} from '@jest/globals';

import {defaultCookingRecovery} from '@/const/user/config/user';
import {testCookingRecoveryData} from '@/tests/data/game/cookingRecovery';
import {StaminaCalcConfig} from '@/types/game/stamina/config';
import {getStaminaEfficiency} from '@/utils/game/stamina/main';


describe('Stamina / From Config', () => {
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
        recovery: {dailyCount: 3, amount: 18},
      },
      cookingRecovery: defaultCookingRecovery,
      general: {
        strategy: 'conservative',
      },
      recoveryRate: {
        general: 1,
        sleep: 1.14,
      },
    };

    const {multiplier} = getStaminaEfficiency({
      config,
      cookingRecoveryData: testCookingRecoveryData,
    });

    // The expected value is just for checking if the calculation outcome somehow changes
    // Therefore if the test fails, once confirmed expected, then the expected value is good to update
    // > Actual test for multiplier calculation at below
    expect(multiplier.average).toBeCloseTo(2.014359);
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
        recovery: {dailyCount: 3, amount: 9},
      },
      cookingRecovery: defaultCookingRecovery,
      general: {
        strategy: 'conservative',
      },
      recoveryRate: {
        general: 1,
        sleep: 1,
      },
    };

    const {multiplier} = getStaminaEfficiency({
      config,
      skillTriggerOverride: {
        type: 'override',
        triggers: [
          {dailyCount: 2, amount: 9},
          {dailyCount: 3, amount: 9},
        ],
      },
      cookingRecoveryData: testCookingRecoveryData,
    });

    // The expected value is just for checking if the calculation outcome somehow changes
    // Therefore if the test fails, once confirmed expected, then the expected value is good to update
    // > Actual test for multiplier calculation at below
    expect(multiplier.average).toBeCloseTo(1.946545);
  });
});
