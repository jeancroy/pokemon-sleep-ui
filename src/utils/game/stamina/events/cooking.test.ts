import {describe, expect, it} from '@jest/globals';

import {defaultCookingRecovery} from '@/const/user/config/user';
import {testCookingRecoveryData} from '@/tests/data/game/cookingRecovery';
import {StaminaSleepSessionConfig} from '@/types/game/stamina/config';
import {StaminaGeneralRecoveryConfig} from '@/types/game/stamina/general';
import {StaminaRecoveryRateConfig} from '@/types/game/stamina/recovery';
import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {getSleepSessionInfo} from '@/utils/game/sleep';
import {getLogsWithCookingRecovery} from '@/utils/game/stamina/events/cooking';
import {getLogsWithPrimarySleep} from '@/utils/game/stamina/events/primary';
import {getLogsWithSecondarySleep} from '@/utils/game/stamina/events/secondary';
import {getLogsWithSkillRecovery} from '@/utils/game/stamina/events/skill';


describe('Stamina / Event Log (+Cooking Recovery)', () => {
  const recoveryRate: StaminaRecoveryRateConfig = {
    general: 1,
    sleep: 1,
  };

  it('is correct under conservative', () => {
    const general: StaminaGeneralRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 1, amount: 9},
    ];
    const session: StaminaSleepSessionConfig = {
      primary: {
        start: 84600, // 23:30
        end: 21600, // 06:00
      },
      secondary: {
        start: 32400, // 07:00
        end: 37800, // 08:30
      },
    };
    const sleepSessionInfo = getSleepSessionInfo({recoveryRate, sleepSession: session});

    let logs = getLogsWithPrimarySleep({
      sleepSessionInfo,
      general,
      skillTriggers,
      recoveryRate,
      cookingRecoveryData: testCookingRecoveryData,
    });
    logs = getLogsWithSecondarySleep({logs, sleepSessionInfo, general});
    logs = getLogsWithSkillRecovery({sleepSessionInfo, general, skillTriggers, logs, recoveryRate});
    logs = getLogsWithCookingRecovery({
      logs,
      general,
      sleepSessionInfo,
      recoveryRate,
      cookingRecoveryData: testCookingRecoveryData,
      cookingRecoveryConfig: defaultCookingRecovery,
    });

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.before).toBe(77);
    expect(logs[0].stamina.after).toBe(77);
    expect(logs[1].type).toBe('cookingRecovery');
    expect(logs[1].timing).toBe(7200);
    expect(logs[1].stamina.before).toBe(65);
    expect(logs[1].stamina.after).toBe(67);
    expect(logs[2].type).toBe('sleep');
    expect(logs[2].timing).toBe(10800);
    expect(logs[2].stamina.before).toBe(61);
    expect(logs[2].stamina.after).toBe(61);
    expect(logs[3].type).toBe('wakeup');
    expect(logs[3].timing).toBe(16200);
    expect(logs[3].stamina.before).toBe(52);
    expect(logs[3].stamina.after).toBe(70);
    expect(logs[4].type).toBe('cookingRecovery');
    expect(logs[4].timing).toBe(23400);
    expect(logs[4].stamina.before).toBe(58);
    expect(logs[4].stamina.after).toBe(61);
    expect(logs[5].type).toBe('skillRecovery');
    expect(logs[5].timing).toBe(34200);
    expect(logs[5].stamina.before).toBe(43);
    expect(logs[5].stamina.after).toBe(52);
    expect(logs[6].type).toBe('cookingRecovery');
    expect(logs[6].timing).toBe(46800);
    expect(logs[6].stamina.before).toBe(31);
    expect(logs[6].stamina.after).toBe(35);
    expect(logs[7].type).toBe('sleep');
    expect(logs[7].timing).toBe(63000);
    expect(logs[7].stamina.before).toBe(8);
    expect(logs[7].stamina.after).toBe(8);
    expect(logs.length).toBe(8);
  });

  it('is correct under optimistic', () => {
    const sleepSessionInfo = getSleepSessionInfo({
      recoveryRate,
      sleepSession: {
        primary: {
          start: 84600, // 23:30
          end: 27000, // 07:30
        },
        secondary: null,
      },
    });
    const general: StaminaGeneralRecoveryConfig = {
      strategy: 'optimistic',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 3, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({
      sleepSessionInfo,
      general,
      skillTriggers,
      recoveryRate,
      cookingRecoveryData: testCookingRecoveryData,
    });
    logs = getLogsWithSecondarySleep({logs, sleepSessionInfo, general});
    logs = getLogsWithSkillRecovery({sleepSessionInfo, general, skillTriggers, logs, recoveryRate});
    logs = getLogsWithCookingRecovery({
      logs,
      general,
      sleepSessionInfo,
      recoveryRate,
      cookingRecoveryData: testCookingRecoveryData,
      cookingRecoveryConfig: defaultCookingRecovery,
    });

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.before).toBe(137);
    expect(logs[0].stamina.after).toBe(137);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(57600);
    expect(logs[1].stamina.before).toBe(41);
    expect(logs[1].stamina.after).toBe(41);
    expect(logs.length).toBe(2);
  });

  it('ignores recovery rate', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 2,
      sleep: 1,
    };
    const sleepSessionInfo = getSleepSessionInfo({
      recoveryRate,
      sleepSession: {
        primary: {
          start: 84600, // 23:30
          end: 27000, // 07:30
        },
        secondary: null,
      },
    });
    const general: StaminaGeneralRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 1, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({
      sleepSessionInfo,
      general,
      skillTriggers,
      recoveryRate,
      cookingRecoveryData: testCookingRecoveryData,
    });
    logs = getLogsWithSecondarySleep({logs, sleepSessionInfo, general});
    logs = getLogsWithSkillRecovery({sleepSessionInfo, general, skillTriggers, logs, recoveryRate});
    logs = getLogsWithCookingRecovery({
      logs,
      general,
      sleepSessionInfo,
      recoveryRate,
      cookingRecoveryData: testCookingRecoveryData,
      cookingRecoveryConfig: defaultCookingRecovery,
    });

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.before).toBe(100);
    expect(logs[0].stamina.after).toBe(100);
    expect(logs[1].type).toBe('cookingRecovery');
    expect(logs[1].timing).toBe(1800);
    expect(logs[1].stamina.before).toBe(97);
    expect(logs[1].stamina.after).toBe(98);
    expect(logs[2].type).toBe('cookingRecovery');
    expect(logs[2].timing).toBe(18000);
    expect(logs[2].stamina.before).toBe(71);
    expect(logs[2].stamina.after).toBe(73);
    expect(logs[3].type).toBe('skillRecovery');
    expect(logs[3].timing).toBe(28800);
    expect(logs[3].stamina.before).toBe(55);
    expect(logs[3].stamina.after).toBe(73);
    expect(logs[4].type).toBe('cookingRecovery');
    expect(logs[4].timing).toBe(41400);
    expect(logs[4].stamina.before).toBe(52);
    expect(logs[4].stamina.after).toBe(55);
    expect(logs[5].type).toBe('sleep');
    expect(logs[5].timing).toBe(57600);
    expect(logs[5].stamina.before).toBe(28);
    expect(logs[5].stamina.after).toBe(28);
    expect(logs.length).toBe(6);
  });
});
