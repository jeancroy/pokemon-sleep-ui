import {describe, expect, it} from '@jest/globals';

import {StaminaRecoveryRateConfig} from '@/types/game/stamina/config';
import {StaminaSkillRecoveryConfig, StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {getSleepSessionInfo} from '@/utils/game/sleep';
import {getLogsWithPrimarySleep} from '@/utils/game/stamina/events/primary';
import {getLogsWithSecondarySleep} from '@/utils/game/stamina/events/secondary';
import {getLogsWithSkillRecovery, getSkillRecoveryData} from '@/utils/game/stamina/events/skill';


describe('Stamina / Skill Recovery Data Generation', () => {
  it('is correct with floating number trigger count', () => {
    const recoveryData = getSkillRecoveryData({
      skillRecovery: {
        strategy: 'conservative',
      },
      skillTrigger: {
        dailyCount: 2.5,
        amount: 9,
      },
      secondarySession: null,
      awakeDuration: 60000,
      recoveryRate: {
        general: 1,
        sleep: 1,
      },
    });

    expect(recoveryData[0].timing).toBe(20000);
    expect(recoveryData[0].amount).toBe(14);
    expect(recoveryData[1].timing).toBe(40000);
    expect(recoveryData[1].amount).toBe(9);
    expect(recoveryData.length).toBe(2);
  });

  it('is correct with trigger count < 1', () => {
    const recoveryData = getSkillRecoveryData({
      skillRecovery: {
        strategy: 'conservative',
      },
      skillTrigger: {
        dailyCount: 0.5,
        amount: 9,
      },
      secondarySession: null,
      awakeDuration: 60000,
      recoveryRate: {
        general: 1,
        sleep: 1,
      },
    });

    expect(recoveryData[0].timing).toBe(30000);
    expect(recoveryData[0].amount).toBe(5);
    expect(recoveryData.length).toBe(1);
  });

  it('is correct with integer trigger count', () => {
    const recoveryData = getSkillRecoveryData({
      skillRecovery: {
        strategy: 'conservative',
      },
      skillTrigger: {
        dailyCount: 3,
        amount: 9,
      },
      secondarySession: null,
      awakeDuration: 60000,
      recoveryRate: {
        general: 1,
        sleep: 1,
      },
    });

    expect(recoveryData[0].timing).toBe(15000);
    expect(recoveryData[0].amount).toBe(9);
    expect(recoveryData[1].timing).toBe(30000);
    expect(recoveryData[1].amount).toBe(9);
    expect(recoveryData[2].timing).toBe(45000);
    expect(recoveryData[2].amount).toBe(9);
    expect(recoveryData.length).toBe(3);
  });

  it('is correct with floating number trigger count and non-1 recovery rate', () => {
    const recoveryData = getSkillRecoveryData({
      skillRecovery: {
        strategy: 'conservative',
      },
      skillTrigger: {
        dailyCount: 2.5,
        amount: 9,
      },
      secondarySession: null,
      awakeDuration: 60000,
      recoveryRate: {
        general: 1.2,
        sleep: 1,
      },
    });

    expect(recoveryData[0].timing).toBe(20000);
    expect(recoveryData[0].amount).toBe(17);
    expect(recoveryData[1].timing).toBe(40000);
    expect(recoveryData[1].amount).toBe(11);
    expect(recoveryData.length).toBe(2);
  });
});

describe('Stamina / Event Log (+Skill)', () => {
  it('is correct with secondary sleep before any skill trigger under conservative', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 84600, // 23:30
        end: 21600, // 06:00
      },
      secondary: {
        start: 25200, // 07:00
        end: 30600, // 08:30
      },
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 3, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});
    logs = getLogsWithSkillRecovery({sessionInfo, skillRecovery, skillTriggers, logs, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(100);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(3600);
    expect(logs[1].stamina.before).toBe(94);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(9000);
    expect(logs[2].stamina.after).toBe(103);
    expect(logs[3].type).toBe('skillRecovery');
    expect(logs[3].timing).toBe(19800);
    expect(logs[3].stamina.before).toBe(85);
    expect(logs[3].stamina.after).toBe(94);
    expect(logs[4].type).toBe('skillRecovery');
    expect(logs[4].timing).toBe(34200);
    expect(logs[4].stamina.before).toBe(70);
    expect(logs[4].stamina.after).toBe(79);
    expect(logs[5].type).toBe('skillRecovery');
    expect(logs[5].timing).toBe(48600);
    expect(logs[5].stamina.before).toBe(55);
    expect(logs[5].stamina.after).toBe(64);
    expect(logs[6].type).toBe('sleep');
    expect(logs[6].timing).toBe(63000);
    expect(logs[6].stamina.before).toBe(40);
    expect(logs.length).toBe(7);
  });

  it('is correct with secondary sleep after a skill trigger under conservative', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 84600, // 23:30
        end: 21600, // 06:00
      },
      secondary: {
        start: 46800, // 13:00
        end: 52200, // 14:30
      },
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 3, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});
    logs = getLogsWithSkillRecovery({sessionInfo, skillRecovery, skillTriggers, logs, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(100);
    expect(logs[1].type).toBe('skillRecovery');
    expect(logs[1].timing).toBe(14400);
    expect(logs[1].stamina.before).toBe(76);
    expect(logs[1].stamina.after).toBe(85);
    expect(logs[2].type).toBe('sleep');
    expect(logs[2].timing).toBe(25200);
    expect(logs[2].stamina.before).toBe(67);
    expect(logs[3].type).toBe('wakeup');
    expect(logs[3].timing).toBe(30600);
    expect(logs[3].stamina.after).toBe(76);
    expect(logs[4].type).toBe('skillRecovery');
    expect(logs[4].timing).toBe(34200);
    expect(logs[4].stamina.before).toBe(70);
    expect(logs[4].stamina.after).toBe(79);
    expect(logs[5].type).toBe('skillRecovery');
    expect(logs[5].timing).toBe(48600);
    expect(logs[5].stamina.before).toBe(55);
    expect(logs[5].stamina.after).toBe(64);
    expect(logs[6].type).toBe('sleep');
    expect(logs[6].timing).toBe(63000);
    expect(logs[6].stamina.before).toBe(40);
    expect(logs.length).toBe(7);
  });

  it('is correct with secondary sleep under optimistic', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 84600, // 23:30
        end: 21600, // 06:00
      },
      secondary: {
        start: 46800, // 13:00
        end: 52200, // 14:30
      },
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'optimistic',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 3, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});
    logs = getLogsWithSkillRecovery({sessionInfo, skillRecovery, skillTriggers, logs, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(127);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(25200);
    expect(logs[1].stamina.before).toBe(85);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(30600);
    expect(logs[2].stamina.after).toBe(94);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63000);
    expect(logs[3].stamina.before).toBe(40);
    expect(logs.length).toBe(4);
  });

  it('is correct if the energy at the end of the day is 0', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 82800, // 23:00
        end: 0, // 00:00
      },
      secondary: null,
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 2, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});
    logs = getLogsWithSkillRecovery({sessionInfo, skillRecovery, skillTriggers, logs, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(80);
    expect(logs[1].type).toBe('skillRecovery');
    expect(logs[1].timing).toBe(27600);
    expect(logs[1].stamina.before).toBe(34);
    expect(logs[1].stamina.after).toBe(43);
    expect(logs[2].type).toBe('skillRecovery');
    expect(logs[2].timing).toBe(55200);
    expect(logs[2].stamina.before).toBe(0);
    expect(logs[2].stamina.after).toBe(9);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(82800);
    expect(logs[3].stamina.before).toBe(0);
    expect(logs.length).toBe(4);
  });

  it('is correct if the energy at the end of the day is low', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 61200, // 17:00
        end: 79200, // 22:00
      },
      secondary: null,
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 2, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});
    logs = getLogsWithSkillRecovery({sessionInfo, skillRecovery, skillTriggers, logs, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(100);
    expect(logs[1].type).toBe('skillRecovery');
    expect(logs[1].timing).toBe(22800);
    expect(logs[1].stamina.before).toBe(62);
    expect(logs[1].stamina.after).toBe(71);
    expect(logs[2].type).toBe('skillRecovery');
    expect(logs[2].timing).toBe(45600);
    expect(logs[2].stamina.before).toBe(33);
    expect(logs[2].stamina.after).toBe(42);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(68400);
    expect(logs[3].stamina.before).toBe(4);
    expect(logs.length).toBe(4);
  });

  it('is correct with secondary sleep happening at the same time of skill trigger', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 75600, // 21:00
        end: 0, // 00:00
      },
      secondary: {
        start: 46800, // 13:00
        end: 52200, // 14:30
      },
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 2, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});
    logs = getLogsWithSkillRecovery({sessionInfo, skillRecovery, skillTriggers, logs, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(100);
    expect(logs[1].type).toBe('skillRecovery');
    expect(logs[1].timing).toBe(23400);
    expect(logs[1].stamina.before).toBe(61);
    expect(logs[1].stamina.after).toBe(70);
    expect(logs[2].type).toBe('skillRecovery');
    expect(logs[2].timing).toBe(46800);
    expect(logs[2].stamina.before).toBe(31);
    expect(logs[2].stamina.after).toBe(40);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(46800);
    expect(logs[3].stamina.before).toBe(40);
    expect(logs[4].type).toBe('wakeup');
    expect(logs[4].timing).toBe(52200);
    expect(logs[4].stamina.after).toBe(49);
    expect(logs[5].type).toBe('sleep');
    expect(logs[5].timing).toBe(75600);
    expect(logs[5].stamina.before).toBe(10);
    expect(logs.length).toBe(6);
  });

  it('is correct with secondary sleep happened at low energy', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 75600, // 21:00
        end: 0, // 00:00
      },
      secondary: {
        start: 68400, // 19:00
        end: 72000, // 20:00
      },
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 2, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});
    logs = getLogsWithSkillRecovery({sessionInfo, skillRecovery, skillTriggers, logs, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(98);
    expect(logs[1].type).toBe('skillRecovery');
    expect(logs[1].timing).toBe(24000);
    expect(logs[1].stamina.before).toBe(58);
    expect(logs[1].stamina.after).toBe(67);
    expect(logs[2].type).toBe('skillRecovery');
    expect(logs[2].timing).toBe(48000);
    expect(logs[2].stamina.before).toBe(27);
    expect(logs[2].stamina.after).toBe(36);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(68400);
    expect(logs[3].stamina.before).toBe(2);
    expect(logs[4].type).toBe('wakeup');
    expect(logs[4].timing).toBe(72000);
    expect(logs[4].stamina.after).toBe(12);
    expect(logs[5].type).toBe('sleep');
    expect(logs[5].timing).toBe(75600);
    expect(logs[5].stamina.before).toBe(6);
    expect(logs.length).toBe(6);
  });

  it('is correct with < 1 recovery rate under conservative', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 0.8,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 84600, // 23:30
        end: 21600, // 06:00
      },
      secondary: {
        start: 46800, // 13:00
        end: 52200, // 14:30
      },
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 3, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});
    logs = getLogsWithSkillRecovery({sessionInfo, skillRecovery, skillTriggers, logs, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(100);
    expect(logs[1].type).toBe('skillRecovery');
    expect(logs[1].timing).toBe(14400);
    expect(logs[1].stamina.before).toBe(76);
    expect(logs[1].stamina.after).toBe(84);
    expect(logs[2].type).toBe('sleep');
    expect(logs[2].timing).toBe(25200);
    expect(logs[2].stamina.before).toBe(66);
    expect(logs[3].type).toBe('wakeup');
    expect(logs[3].timing).toBe(30600);
    expect(logs[3].stamina.after).toBe(72);
    expect(logs[4].type).toBe('skillRecovery');
    expect(logs[4].timing).toBe(34200);
    expect(logs[4].stamina.before).toBe(66);
    expect(logs[4].stamina.after).toBe(74);
    expect(logs[5].type).toBe('skillRecovery');
    expect(logs[5].timing).toBe(48600);
    expect(logs[5].stamina.before).toBe(50);
    expect(logs[5].stamina.after).toBe(58);
    expect(logs[6].type).toBe('sleep');
    expect(logs[6].timing).toBe(63000);
    expect(logs[6].stamina.before).toBe(34);
    expect(logs.length).toBe(7);
  });

  it('is correct with < 1 recovery rate under conservative with skill recovery', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 0.8,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 84600, // 23:30
        end: 21600, // 06:00
      },
      secondary: {
        start: 46800, // 13:00
        end: 52200, // 14:30
      },
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 3, amount: 5},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});
    logs = getLogsWithSkillRecovery({sessionInfo, skillRecovery, skillTriggers, logs, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(96);
    expect(logs[1].type).toBe('skillRecovery');
    expect(logs[1].timing).toBe(14400);
    expect(logs[1].stamina.before).toBe(72);
    expect(logs[1].stamina.after).toBe(76);
    expect(logs[2].type).toBe('sleep');
    expect(logs[2].timing).toBe(25200);
    expect(logs[2].stamina.before).toBe(58);
    expect(logs[3].type).toBe('wakeup');
    expect(logs[3].timing).toBe(30600);
    expect(logs[3].stamina.after).toBe(64);
    expect(logs[4].type).toBe('skillRecovery');
    expect(logs[4].timing).toBe(34200);
    expect(logs[4].stamina.before).toBe(58);
    expect(logs[4].stamina.after).toBe(62);
    expect(logs[5].type).toBe('skillRecovery');
    expect(logs[5].timing).toBe(48600);
    expect(logs[5].stamina.before).toBe(38);
    expect(logs[5].stamina.after).toBe(42);
    expect(logs[6].type).toBe('sleep');
    expect(logs[6].timing).toBe(63000);
    expect(logs[6].stamina.before).toBe(18);
    expect(logs.length).toBe(7);
  });

  it('is correct with > 1 recovery rate under conservative', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1.2,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 84600, // 23:30
        end: 21600, // 06:00
      },
      secondary: {
        start: 46800, // 13:00
        end: 52200, // 14:30
      },
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 3, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});
    logs = getLogsWithSkillRecovery({sessionInfo, skillRecovery, skillTriggers, logs, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(100);
    expect(logs[1].type).toBe('skillRecovery');
    expect(logs[1].timing).toBe(14400);
    expect(logs[1].stamina.before).toBe(76);
    expect(logs[1].stamina.after).toBe(87);
    expect(logs[2].type).toBe('sleep');
    expect(logs[2].timing).toBe(25200);
    expect(logs[2].stamina.before).toBe(69);
    expect(logs[3].type).toBe('wakeup');
    expect(logs[3].timing).toBe(30600);
    expect(logs[3].stamina.after).toBe(82);
    expect(logs[4].type).toBe('skillRecovery');
    expect(logs[4].timing).toBe(34200);
    expect(logs[4].stamina.before).toBe(76);
    expect(logs[4].stamina.after).toBe(87);
    expect(logs[5].type).toBe('skillRecovery');
    expect(logs[5].timing).toBe(48600);
    expect(logs[5].stamina.before).toBe(63);
    expect(logs[5].stamina.after).toBe(74);
    expect(logs[6].type).toBe('sleep');
    expect(logs[6].timing).toBe(63000);
    expect(logs[6].stamina.before).toBe(50);
    expect(logs.length).toBe(7);
  });

  it('is correct with < 1 recovery rate under optimistic', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 0.8,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 84600, // 23:30
        end: 21600, // 06:00
      },
      secondary: {
        start: 46800, // 13:00
        end: 52200, // 14:30
      },
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'optimistic',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 3, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});
    logs = getLogsWithSkillRecovery({sessionInfo, skillRecovery, skillTriggers, logs, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(124);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(25200);
    expect(logs[1].stamina.before).toBe(82);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(30600);
    expect(logs[2].stamina.after).toBe(88);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63000);
    expect(logs[3].stamina.before).toBe(34);
    expect(logs.length).toBe(4);
  });

  it('is correct with > 1 recovery rate under optimistic', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1.2,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 84600, // 23:30
        end: 21600, // 06:00
      },
      secondary: {
        start: 46800, // 13:00
        end: 52200, // 14:30
      },
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'optimistic',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 3, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});
    logs = getLogsWithSkillRecovery({sessionInfo, skillRecovery, skillTriggers, logs, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(133);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(25200);
    expect(logs[1].stamina.before).toBe(91);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(30600);
    expect(logs[2].stamina.after).toBe(104);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63000);
    expect(logs[3].stamina.before).toBe(50);
    expect(logs.length).toBe(4);
  });

  it('is correct with floating number trigger count under conservative', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 84600, // 23:30
        end: 21600, // 06:00
      },
      secondary: null,
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 2.5, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});
    logs = getLogsWithSkillRecovery({sessionInfo, skillRecovery, skillTriggers, logs, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(100);
    expect(logs[1].type).toBe('skillRecovery');
    expect(logs[1].timing).toBe(21000);
    expect(logs[1].stamina.before).toBe(65);
    expect(logs[1].stamina.after).toBe(79);
    expect(logs[2].type).toBe('skillRecovery');
    expect(logs[2].timing).toBe(42000);
    expect(logs[2].stamina.before).toBe(44);
    expect(logs[2].stamina.after).toBe(53);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63000);
    expect(logs[3].stamina.before).toBe(18);
    expect(logs.length).toBe(4);
  });

  it('is correct with multiple skill triggers', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 0, // 00:00
        end: 28800, // 08:00
      },
      secondary: null,
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 3, amount: 9},
      {dailyCount: 2, amount: 12},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});
    logs = getLogsWithSkillRecovery({sessionInfo, skillRecovery, skillTriggers, logs, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(100);
    expect(logs[1].type).toBe('skillRecovery');
    expect(logs[1].timing).toBe(14400);
    expect(logs[1].stamina.before).toBe(76);
    expect(logs[1].stamina.after).toBe(85);
    expect(logs[2].type).toBe('skillRecovery');
    expect(logs[2].timing).toBe(19200);
    expect(logs[2].stamina.before).toBe(77);
    expect(logs[2].stamina.after).toBe(89);
    expect(logs[3].type).toBe('skillRecovery');
    expect(logs[3].timing).toBe(28800);
    expect(logs[3].stamina.before).toBe(73);
    expect(logs[3].stamina.after).toBe(82);
    expect(logs[4].type).toBe('skillRecovery');
    expect(logs[4].timing).toBe(38400);
    expect(logs[4].stamina.before).toBe(66);
    expect(logs[4].stamina.after).toBe(78);
    expect(logs[5].type).toBe('skillRecovery');
    expect(logs[5].timing).toBe(43200);
    expect(logs[5].stamina.before).toBe(70);
    expect(logs[5].stamina.after).toBe(79);
    expect(logs[6].type).toBe('sleep');
    expect(logs[6].timing).toBe(57600);
    expect(logs[6].stamina.before).toBe(55);
    expect(logs.length).toBe(7);
  });
});
