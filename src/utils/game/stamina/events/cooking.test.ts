import {describe, expect, it} from '@jest/globals';

import {defaultCookingRecovery} from '@/const/user/settings';
import {testCookingRecoveryData} from '@/tests/data/game/cookingRecovery';
import {SleepSessionInfo} from '@/types/game/sleep';
import {StaminaSleepSessionConfig} from '@/types/game/stamina/config';
import {StaminaRecoveryRateConfig} from '@/types/game/stamina/recovery';
import {StaminaSkillRecoveryConfig, StaminaSkillTriggerData} from '@/types/game/stamina/skill';
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
    const skillRecovery: StaminaSkillRecoveryConfig = {
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
    const sessionInfo: SleepSessionInfo = getSleepSessionInfo({recoveryRate, session});

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs});
    logs = getLogsWithSkillRecovery({sessionInfo, skillRecovery, skillTriggers, logs, recoveryRate});
    logs = getLogsWithCookingRecovery({
      logs,
      sessionInfo,
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
    const sessionInfo = getSleepSessionInfo({
      recoveryRate,
      session: {
        primary: {
          start: 84600, // 23:30
          end: 27000, // 07:30
        },
        secondary: null,
      },
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'optimistic',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 3, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs});
    logs = getLogsWithSkillRecovery({sessionInfo, skillRecovery, skillTriggers, logs, recoveryRate});
    logs = getLogsWithCookingRecovery({
      logs,
      sessionInfo,
      recoveryRate,
      cookingRecoveryData: testCookingRecoveryData,
      cookingRecoveryConfig: defaultCookingRecovery,
    });

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.before).toBe(122);
    expect(logs[0].stamina.after).toBe(122);
    expect(logs[1].type).toBe('cookingRecovery');
    expect(logs[1].timing).toBe(1800);
    expect(logs[1].stamina.before).toBe(119);
    expect(logs[1].stamina.after).toBe(119);
    expect(logs[2].type).toBe('cookingRecovery');
    expect(logs[2].timing).toBe(18000);
    expect(logs[2].stamina.before).toBe(92);
    expect(logs[2].stamina.after).toBe(93);
    expect(logs[3].type).toBe('cookingRecovery');
    expect(logs[3].timing).toBe(41400);
    expect(logs[3].stamina.before).toBe(54);
    expect(logs[3].stamina.after).toBe(57);
    expect(logs[4].type).toBe('sleep');
    expect(logs[4].timing).toBe(57600);
    expect(logs[4].stamina.before).toBe(30);
    expect(logs[4].stamina.after).toBe(30);
    expect(logs.length).toBe(5);
  });

  it('respects recovery rate up', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 2,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      recoveryRate,
      session: {
        primary: {
          start: 84600, // 23:30
          end: 27000, // 07:30
        },
        secondary: null,
      },
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 1, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs});
    logs = getLogsWithSkillRecovery({sessionInfo, skillRecovery, skillTriggers, logs, recoveryRate});
    logs = getLogsWithCookingRecovery({
      logs,
      sessionInfo,
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
    expect(logs[1].stamina.after).toBe(99);
    expect(logs[2].type).toBe('cookingRecovery');
    expect(logs[2].timing).toBe(18000);
    expect(logs[2].stamina.before).toBe(72);
    expect(logs[2].stamina.after).toBe(76);
    expect(logs[3].type).toBe('skillRecovery');
    expect(logs[3].timing).toBe(28800);
    expect(logs[3].stamina.before).toBe(58);
    expect(logs[3].stamina.after).toBe(76);
    expect(logs[4].type).toBe('cookingRecovery');
    expect(logs[4].timing).toBe(41400);
    expect(logs[4].stamina.before).toBe(55);
    expect(logs[4].stamina.after).toBe(61);
    expect(logs[5].type).toBe('sleep');
    expect(logs[5].timing).toBe(57600);
    expect(logs[5].stamina.before).toBe(34);
    expect(logs[5].stamina.after).toBe(34);
    expect(logs.length).toBe(6);
  });

  it('respects recovery rate down', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 0.5,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      recoveryRate,
      session: {
        primary: {
          start: 84600, // 23:30
          end: 27000, // 07:30
        },
        secondary: null,
      },
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 1, amount: 10},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs});
    logs = getLogsWithSkillRecovery({sessionInfo, skillRecovery, skillTriggers, logs, recoveryRate});
    logs = getLogsWithCookingRecovery({
      logs,
      sessionInfo,
      recoveryRate,
      cookingRecoveryData: testCookingRecoveryData,
      cookingRecoveryConfig: defaultCookingRecovery,
    });

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.before).toBe(48);
    expect(logs[0].stamina.after).toBe(48);
    expect(logs[1].type).toBe('cookingRecovery');
    expect(logs[1].timing).toBe(1800);
    expect(logs[1].stamina.before).toBe(45);
    expect(logs[1].stamina.after).toBe(47);
    expect(logs[2].type).toBe('cookingRecovery');
    expect(logs[2].timing).toBe(18000);
    expect(logs[2].stamina.before).toBe(20);
    expect(logs[2].stamina.after).toBe(23);
    expect(logs[3].type).toBe('skillRecovery');
    expect(logs[3].timing).toBe(28800);
    expect(logs[3].stamina.before).toBe(5);
    expect(logs[3].stamina.after).toBe(10);
    expect(logs[4].type).toBe('cookingRecovery');
    expect(logs[4].timing).toBe(41400);
    expect(logs[4].stamina.before).toBe(0);
    expect(logs[4].stamina.after).toBe(3);
    expect(logs[5].type).toBe('sleep');
    expect(logs[5].timing).toBe(57600);
    expect(logs[5].stamina.before).toBe(0);
    expect(logs[5].stamina.after).toBe(0);
    expect(logs.length).toBe(6);
  });
});
