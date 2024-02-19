import {describe, expect, it} from '@jest/globals';

import {defaultCookingRecovery} from '@/const/user/settings';
import {testCookingRecoveryData} from '@/tests/data/game/cookingRecovery';
import {StaminaCalcConfig} from '@/types/game/stamina/config';
import {getSleepSessionInfo} from '@/utils/game/sleep';
import {getStaminaEventLogs} from '@/utils/game/stamina/log/main';


describe('Stamina / Get Logs', () => {
  it('starts from 100 if net change is > 0', () => {
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
        sleep: 1,
      },
    };

    const logs = getStaminaEventLogs({
      config,
      cookingRecoveryData: testCookingRecoveryData,
      sleepSessionInfo: getSleepSessionInfo(config),
    });

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].stamina.before).toBe(100);
    expect(logs[0].stamina.after).toBe(100);
  });

  it('starts from primary recovery amount if net change is < 0', () => {
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

    const logs = getStaminaEventLogs({
      config,
      cookingRecoveryData: testCookingRecoveryData,
      sleepSessionInfo: getSleepSessionInfo(config),
    });

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].stamina.before).toBe(77);
    expect(logs[0].stamina.after).toBe(77);
  });
});
