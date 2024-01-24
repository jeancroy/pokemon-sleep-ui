import {describe, expect, it} from '@jest/globals';

import {StaminaRecoveryRateConfig} from '@/types/game/stamina/config';
import {StaminaSkillRecoveryConfig, StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {getSleepSessionInfo} from '@/utils/game/sleep';
import {getLogsWithPrimarySleep} from '@/utils/game/stamina/events/primary';
import {getLogsWithSecondarySleep} from '@/utils/game/stamina/events/secondary';


describe('Stamina Event Log (+Secondary)', () => {
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

  it('is correct under optimistic', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1,
      sleep: 1,
    };
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'optimistic',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 3, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(127);
    expect(logs[0].staminaUnderlying.after).toBe(127);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(25200);
    expect(logs[1].stamina.before).toBe(85);
    expect(logs[1].stamina.after).toBe(85);
    expect(logs[1].staminaUnderlying.before).toBe(85);
    expect(logs[1].staminaUnderlying.after).toBe(85);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(30600);
    expect(logs[2].stamina.before).toBe(76);
    expect(logs[2].stamina.after).toBe(94);
    expect(logs[2].staminaUnderlying.before).toBe(76);
    expect(logs[2].staminaUnderlying.after).toBe(94);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63000);
    expect(logs[3].stamina.before).toBe(40);
    expect(logs[3].stamina.after).toBe(40);
    expect(logs[3].staminaUnderlying.before).toBe(40);
    expect(logs[3].staminaUnderlying.after).toBe(40);
    expect(logs.length).toBe(4);
  });

  it('is correct under conservative', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1,
      sleep: 1,
    };
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 3, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(100);
    expect(logs[0].staminaUnderlying.after).toBe(100);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(25200);
    expect(logs[1].stamina.before).toBe(58);
    expect(logs[1].stamina.after).toBe(58);
    expect(logs[1].staminaUnderlying.before).toBe(58);
    expect(logs[1].staminaUnderlying.after).toBe(58);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(30600);
    expect(logs[2].stamina.before).toBe(49);
    expect(logs[2].stamina.after).toBe(67);
    expect(logs[2].staminaUnderlying.before).toBe(49);
    expect(logs[2].staminaUnderlying.after).toBe(67);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63000);
    expect(logs[3].stamina.before).toBe(13);
    expect(logs[3].stamina.after).toBe(13);
    expect(logs[3].staminaUnderlying.before).toBe(13);
    expect(logs[3].staminaUnderlying.after).toBe(13);
    expect(logs.length).toBe(4);
  });

  it('is correct occurred after 0 energy', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 81000, // 22:30
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
      {dailyCount: 0, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(71);
    expect(logs[0].staminaUnderlying.after).toBe(71);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(68400);
    expect(logs[1].stamina.before).toBe(0);
    expect(logs[1].stamina.after).toBe(0);
    expect(logs[1].staminaUnderlying.before).toBe(-43);
    expect(logs[1].staminaUnderlying.after).toBe(-43);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(72000);
    expect(logs[2].stamina.before).toBe(0);
    expect(logs[2].stamina.after).toBe(12);
    expect(logs[2].staminaUnderlying.before).toBe(-49);
    expect(logs[2].staminaUnderlying.after).toBe(-37);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(81000);
    expect(logs[3].stamina.before).toBe(0);
    expect(logs[3].stamina.after).toBe(0);
    expect(logs[3].staminaUnderlying.before).toBe(-52);
    expect(logs[3].staminaUnderlying.after).toBe(-52);
    expect(logs.length).toBe(4);
  });

  it('is correct with > 1 recovery rate under optimistic', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1.2,
      sleep: 1,
    };
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'optimistic',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 3, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(133);
    expect(logs[0].staminaUnderlying.after).toBe(133);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(25200);
    expect(logs[1].stamina.before).toBe(91);
    expect(logs[1].stamina.after).toBe(91);
    expect(logs[1].staminaUnderlying.before).toBe(91);
    expect(logs[1].staminaUnderlying.after).toBe(91);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(30600);
    expect(logs[2].stamina.before).toBe(82);
    expect(logs[2].stamina.after).toBe(104);
    expect(logs[2].staminaUnderlying.before).toBe(82);
    expect(logs[2].staminaUnderlying.after).toBe(104);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63000);
    expect(logs[3].stamina.before).toBe(50);
    expect(logs[3].stamina.after).toBe(50);
    expect(logs[3].staminaUnderlying.before).toBe(50);
    expect(logs[3].staminaUnderlying.after).toBe(50);
    expect(logs.length).toBe(4);
  });

  it('is correct with < 1 recovery rate under optimistic', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 0.8,
      sleep: 1,
    };
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'optimistic',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 3, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(124);
    expect(logs[0].staminaUnderlying.after).toBe(124);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(25200);
    expect(logs[1].stamina.before).toBe(82);
    expect(logs[1].stamina.after).toBe(82);
    expect(logs[1].staminaUnderlying.before).toBe(82);
    expect(logs[1].staminaUnderlying.after).toBe(82);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(30600);
    expect(logs[2].stamina.before).toBe(73);
    expect(logs[2].stamina.after).toBe(88);
    expect(logs[2].staminaUnderlying.before).toBe(73);
    expect(logs[2].staminaUnderlying.after).toBe(88);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63000);
    expect(logs[3].stamina.before).toBe(34);
    expect(logs[3].stamina.after).toBe(34);
    expect(logs[3].staminaUnderlying.before).toBe(34);
    expect(logs[3].staminaUnderlying.after).toBe(34);
    expect(logs.length).toBe(4);
  });

  it('is correct with > 1 recovery rate under conservative', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1.2,
      sleep: 1,
    };
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 3, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(100);
    expect(logs[0].staminaUnderlying.after).toBe(100);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(25200);
    expect(logs[1].stamina.before).toBe(58);
    expect(logs[1].stamina.after).toBe(58);
    expect(logs[1].staminaUnderlying.before).toBe(58);
    expect(logs[1].staminaUnderlying.after).toBe(58);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(30600);
    expect(logs[2].stamina.before).toBe(49);
    expect(logs[2].stamina.after).toBe(71);
    expect(logs[2].staminaUnderlying.before).toBe(49);
    expect(logs[2].staminaUnderlying.after).toBe(71);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63000);
    expect(logs[3].stamina.before).toBe(17);
    expect(logs[3].stamina.after).toBe(17);
    expect(logs[3].staminaUnderlying.before).toBe(17);
    expect(logs[3].staminaUnderlying.after).toBe(17);
    expect(logs.length).toBe(4);
  });

  it('is correct with < 1 recovery rate under conservative', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 0.8,
      sleep: 1,
    };
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 0, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(84);
    expect(logs[0].staminaUnderlying.after).toBe(84);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(25200);
    expect(logs[1].stamina.before).toBe(42);
    expect(logs[1].stamina.after).toBe(42);
    expect(logs[1].staminaUnderlying.before).toBe(42);
    expect(logs[1].staminaUnderlying.after).toBe(42);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(30600);
    expect(logs[2].stamina.before).toBe(33);
    expect(logs[2].stamina.after).toBe(48);
    expect(logs[2].staminaUnderlying.before).toBe(33);
    expect(logs[2].staminaUnderlying.after).toBe(48);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63000);
    expect(logs[3].stamina.before).toBe(0);
    expect(logs[3].stamina.after).toBe(0);
    expect(logs[3].staminaUnderlying.before).toBe(-6);
    expect(logs[3].staminaUnderlying.after).toBe(-6);
    expect(logs.length).toBe(4);
  });

  it('is correct with < 1 recovery rate under conservative with skill recovery', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 0.8,
      sleep: 1,
    };
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 1, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(92);
    expect(logs[0].staminaUnderlying.after).toBe(92);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(25200);
    expect(logs[1].stamina.before).toBe(50);
    expect(logs[1].stamina.after).toBe(50);
    expect(logs[1].staminaUnderlying.before).toBe(50);
    expect(logs[1].staminaUnderlying.after).toBe(50);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(30600);
    expect(logs[2].stamina.before).toBe(41);
    expect(logs[2].stamina.after).toBe(56);
    expect(logs[2].staminaUnderlying.before).toBe(41);
    expect(logs[2].staminaUnderlying.after).toBe(56);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63000);
    expect(logs[3].stamina.before).toBe(2);
    expect(logs[3].stamina.after).toBe(2);
    expect(logs[3].staminaUnderlying.before).toBe(2);
    expect(logs[3].staminaUnderlying.after).toBe(2);
    expect(logs.length).toBe(4);
  });

  it('is correct with < 1 recovery rate and awake for 50400 secs', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 0.8,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 57600,
        end: 0,
      },
      secondary: {
        start: 18000,
        end: 25200,
      },
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'optimistic',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(96);
    expect(logs[0].staminaUnderlying.after).toBe(96);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(18000);
    expect(logs[1].stamina.before).toBe(66);
    expect(logs[1].stamina.after).toBe(66);
    expect(logs[1].staminaUnderlying.before).toBe(66);
    expect(logs[1].staminaUnderlying.after).toBe(66);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(25200);
    expect(logs[2].stamina.before).toBe(54);
    expect(logs[2].stamina.after).toBe(58);
    expect(logs[2].staminaUnderlying.before).toBe(54);
    expect(logs[2].staminaUnderlying.after).toBe(58);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(57600);
    expect(logs[3].stamina.before).toBe(4);
    expect(logs[3].staminaUnderlying.before).toBe(4);
    expect(logs.length).toBe(4);
  });

  it('is correct with < 1 recovery rate and awake for 56400 secs', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 0.8,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 63600,
        end: 0,
      },
      secondary: {
        start: 24000,
        end: 31200,
      },
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'optimistic',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(86);
    expect(logs[0].staminaUnderlying.after).toBe(86);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(24000);
    expect(logs[1].stamina.before).toBe(46);
    expect(logs[1].stamina.after).toBe(46);
    expect(logs[1].staminaUnderlying.before).toBe(46);
    expect(logs[1].staminaUnderlying.after).toBe(46);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(31200);
    expect(logs[2].stamina.before).toBe(34);
    expect(logs[2].stamina.after).toBe(54);
    expect(logs[2].staminaUnderlying.before).toBe(34);
    expect(logs[2].staminaUnderlying.after).toBe(54);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63600);
    expect(logs[3].stamina.before).toBe(0);
    expect(logs[3].stamina.after).toBe(0);
    expect(logs[3].staminaUnderlying.before).toBe(0);
    expect(logs[3].staminaUnderlying.after).toBe(0);
    expect(logs.length).toBe(4);
  });

  it('is correct with < 1 recovery rate and awake for 62400 secs', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 0.8,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 69600,
        end: 0,
      },
      secondary: {
        start: 30000,
        end: 37200,
      },
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'optimistic',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(76);
    expect(logs[0].staminaUnderlying.after).toBe(76);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(30000);
    expect(logs[1].stamina.before).toBe(26);
    expect(logs[1].stamina.after).toBe(26);
    expect(logs[1].staminaUnderlying.before).toBe(26);
    expect(logs[1].staminaUnderlying.after).toBe(26);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(37200);
    expect(logs[2].stamina.before).toBe(14);
    expect(logs[2].stamina.after).toBe(34);
    expect(logs[2].staminaUnderlying.before).toBe(14);
    expect(logs[2].staminaUnderlying.after).toBe(34);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(69600);
    expect(logs[3].stamina.before).toBe(0);
    expect(logs[3].stamina.after).toBe(0);
    expect(logs[3].staminaUnderlying.before).toBe(-20);
    expect(logs[3].staminaUnderlying.after).toBe(-20);
    expect(logs.length).toBe(4);
  });

  it('is correct with < 1 recovery rate and awake for 68400 secs', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 0.8,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 75600,
        end: 0,
      },
      secondary: {
        start: 36000,
        end: 43200,
      },
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'optimistic',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(66);
    expect(logs[0].staminaUnderlying.after).toBe(66);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(36000);
    expect(logs[1].stamina.before).toBe(6);
    expect(logs[1].stamina.after).toBe(6);
    expect(logs[1].staminaUnderlying.before).toBe(6);
    expect(logs[1].staminaUnderlying.after).toBe(6);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(43200);
    expect(logs[2].stamina.before).toBe(0);
    expect(logs[2].stamina.after).toBe(20);
    expect(logs[2].staminaUnderlying.before).toBe(-6);
    expect(logs[2].staminaUnderlying.after).toBe(14);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(75600);
    expect(logs[3].stamina.before).toBe(0);
    expect(logs[3].stamina.after).toBe(0);
    expect(logs[3].staminaUnderlying.before).toBe(-40);
    expect(logs[3].staminaUnderlying.after).toBe(-40);
    expect(logs.length).toBe(4);
  });
});
