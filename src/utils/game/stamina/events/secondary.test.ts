import {describe, expect, it} from '@jest/globals';

import {StaminaRecoveryRateConfig, StaminaSleepSessionConfig} from '@/types/game/stamina/config';
import {StaminaSkillRecoveryConfig, StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {getSleepSessionInfo} from '@/utils/game/sleep';
import {getLogsWithPrimarySleep} from '@/utils/game/stamina/events/primary';
import {getLogsWithSecondarySleep} from '@/utils/game/stamina/events/secondary';


describe('Stamina / Event Log (+Secondary)', () => {
  const recoveryRate: StaminaRecoveryRateConfig = {
    general: 1,
    sleep: 1,
  };
  const defaultSessionConfig: StaminaSleepSessionConfig ={
    primary: {
      start: 0, // 00:00
      end: 23400, // 06:30
    },
    secondary: {
      start: 48600, // 13:30
      end: 54000, // 15:00
    },
  };
  const sessionInfo = getSleepSessionInfo({
    recoveryRate,
    session: defaultSessionConfig,
  });

  it('is correct under optimistic', () => {
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'optimistic',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 3, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(104);
    expect(logs[0].staminaUnderlying.after).toBe(104);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(25200);
    expect(logs[1].stamina.before).toBe(62);
    expect(logs[1].stamina.after).toBe(62);
    expect(logs[1].staminaUnderlying.before).toBe(62);
    expect(logs[1].staminaUnderlying.after).toBe(62);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(30600);
    expect(logs[2].stamina.before).toBe(53);
    expect(logs[2].stamina.after).toBe(71);
    expect(logs[2].staminaUnderlying.before).toBe(53);
    expect(logs[2].staminaUnderlying.after).toBe(71);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63000);
    expect(logs[3].stamina.before).toBe(17);
    expect(logs[3].stamina.after).toBe(17);
    expect(logs[3].staminaUnderlying.before).toBe(17);
    expect(logs[3].staminaUnderlying.after).toBe(17);
    expect(logs.length).toBe(4);
  });

  it('is correct under conservative', () => {
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 3, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(77);
    expect(logs[0].staminaUnderlying.after).toBe(77);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(25200);
    expect(logs[1].stamina.before).toBe(35);
    expect(logs[1].stamina.after).toBe(35);
    expect(logs[1].staminaUnderlying.before).toBe(35);
    expect(logs[1].staminaUnderlying.after).toBe(35);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(30600);
    expect(logs[2].stamina.before).toBe(26);
    expect(logs[2].stamina.after).toBe(44);
    expect(logs[2].staminaUnderlying.before).toBe(26);
    expect(logs[2].staminaUnderlying.after).toBe(44);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63000);
    expect(logs[3].stamina.before).toBe(0);
    expect(logs[3].stamina.after).toBe(0);
    expect(logs[3].staminaUnderlying.before).toBe(-10);
    expect(logs[3].staminaUnderlying.after).toBe(-10);
    expect(logs.length).toBe(4);
  });

  it('is correct occurred after 0 energy', () => {
    const sessionInfo = getSleepSessionInfo({
      recoveryRate,
      session: {
        primary: {
          start: 81000, // 22:30
          end: 0, // 00:00
        },
        secondary: {
          start: 68400, // 19:00
          end: 72000, // 20:00
        },
      },
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 0, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(18);
    expect(logs[0].staminaUnderlying.after).toBe(18);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(68400);
    expect(logs[1].stamina.before).toBe(0);
    expect(logs[1].stamina.after).toBe(0);
    expect(logs[1].staminaUnderlying.before).toBe(-96);
    expect(logs[1].staminaUnderlying.after).toBe(-96);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(72000);
    expect(logs[2].stamina.before).toBe(0);
    expect(logs[2].stamina.after).toBe(12);
    expect(logs[2].staminaUnderlying.before).toBe(-102);
    expect(logs[2].staminaUnderlying.after).toBe(-90);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(81000);
    expect(logs[3].stamina.before).toBe(0);
    expect(logs[3].stamina.after).toBe(0);
    expect(logs[3].staminaUnderlying.before).toBe(-105);
    expect(logs[3].staminaUnderlying.after).toBe(-105);
    expect(logs.length).toBe(4);
  });

  it('is correct with > 1 recovery rate under optimistic', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1.2,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      recoveryRate,
      session: defaultSessionConfig,
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'optimistic',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 3, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(125);
    expect(logs[0].staminaUnderlying.after).toBe(125);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(25200);
    expect(logs[1].stamina.before).toBe(83);
    expect(logs[1].stamina.after).toBe(83);
    expect(logs[1].staminaUnderlying.before).toBe(83);
    expect(logs[1].staminaUnderlying.after).toBe(83);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(30600);
    expect(logs[2].stamina.before).toBe(74);
    expect(logs[2].stamina.after).toBe(82);
    expect(logs[2].staminaUnderlying.before).toBe(74);
    expect(logs[2].staminaUnderlying.after).toBe(82);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63000);
    expect(logs[3].stamina.before).toBe(28);
    expect(logs[3].stamina.after).toBe(28);
    expect(logs[3].staminaUnderlying.before).toBe(28);
    expect(logs[3].staminaUnderlying.after).toBe(28);
    expect(logs.length).toBe(4);
  });

  it('is correct with < 1 recovery rate under optimistic', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 0.8,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      recoveryRate,
      session: defaultSessionConfig,
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'optimistic',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 3, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(86);
    expect(logs[0].staminaUnderlying.after).toBe(86);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(25200);
    expect(logs[1].stamina.before).toBe(44);
    expect(logs[1].stamina.after).toBe(44);
    expect(logs[1].staminaUnderlying.before).toBe(44);
    expect(logs[1].staminaUnderlying.after).toBe(44);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(30600);
    expect(logs[2].stamina.before).toBe(35);
    expect(logs[2].stamina.after).toBe(50);
    expect(logs[2].staminaUnderlying.before).toBe(35);
    expect(logs[2].staminaUnderlying.after).toBe(50);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63000);
    expect(logs[3].stamina.before).toBe(0);
    expect(logs[3].stamina.after).toBe(0);
    expect(logs[3].staminaUnderlying.before).toBe(-4);
    expect(logs[3].staminaUnderlying.after).toBe(-4);
    expect(logs.length).toBe(4);
  });

  it('is correct with > 1 recovery rate under conservative', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1.2,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      recoveryRate,
      session: defaultSessionConfig,
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 3, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs});

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
    expect(logs[2].stamina.after).toBe(49);
    expect(logs[2].staminaUnderlying.before).toBe(41);
    expect(logs[2].staminaUnderlying.after).toBe(49);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63000);
    expect(logs[3].stamina.before).toBe(0);
    expect(logs[3].stamina.after).toBe(0);
    expect(logs[3].staminaUnderlying.before).toBe(-5);
    expect(logs[3].staminaUnderlying.after).toBe(-5);
    expect(logs.length).toBe(4);
  });

  it('is correct with < 1 recovery rate under conservative', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 0.8,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      recoveryRate,
      session: defaultSessionConfig,
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 0, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(62);
    expect(logs[0].staminaUnderlying.after).toBe(62);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(25200);
    expect(logs[1].stamina.before).toBe(20);
    expect(logs[1].stamina.after).toBe(20);
    expect(logs[1].staminaUnderlying.before).toBe(20);
    expect(logs[1].staminaUnderlying.after).toBe(20);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(30600);
    expect(logs[2].stamina.before).toBe(11);
    expect(logs[2].stamina.after).toBe(26);
    expect(logs[2].staminaUnderlying.before).toBe(11);
    expect(logs[2].staminaUnderlying.after).toBe(26);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63000);
    expect(logs[3].stamina.before).toBe(0);
    expect(logs[3].stamina.after).toBe(0);
    expect(logs[3].staminaUnderlying.before).toBe(-28);
    expect(logs[3].staminaUnderlying.after).toBe(-28);
    expect(logs.length).toBe(4);
  });

  it('is correct with < 1 recovery rate under conservative with skill recovery', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 0.8,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      recoveryRate,
      session: defaultSessionConfig,
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 1, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(62);
    expect(logs[0].staminaUnderlying.after).toBe(62);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(25200);
    expect(logs[1].stamina.before).toBe(20);
    expect(logs[1].stamina.after).toBe(20);
    expect(logs[1].staminaUnderlying.before).toBe(20);
    expect(logs[1].staminaUnderlying.after).toBe(20);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(30600);
    expect(logs[2].stamina.before).toBe(11);
    expect(logs[2].stamina.after).toBe(26);
    expect(logs[2].staminaUnderlying.before).toBe(11);
    expect(logs[2].staminaUnderlying.after).toBe(26);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63000);
    expect(logs[3].stamina.before).toBe(0);
    expect(logs[3].stamina.after).toBe(0);
    expect(logs[3].staminaUnderlying.before).toBe(-28);
    expect(logs[3].staminaUnderlying.after).toBe(-28);
    expect(logs.length).toBe(4);
  });

  it('is correct with < 1 recovery rate and awake for 50400 secs', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 0.8,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      recoveryRate,
      session: {
        primary: {
          start: 57600, // 16:00
          end: 0, // 00:00
        },
        secondary: {
          start: 18000, // 05:00
          end: 25200, // 07:00
        },
      },
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'optimistic',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(76);
    expect(logs[0].staminaUnderlying.after).toBe(76);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(18000);
    expect(logs[1].stamina.before).toBe(46);
    expect(logs[1].stamina.after).toBe(46);
    expect(logs[1].staminaUnderlying.before).toBe(46);
    expect(logs[1].staminaUnderlying.after).toBe(46);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(25200);
    expect(logs[2].stamina.before).toBe(34);
    expect(logs[2].stamina.after).toBe(39);
    expect(logs[2].staminaUnderlying.before).toBe(34);
    expect(logs[2].staminaUnderlying.after).toBe(39);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(57600);
    expect(logs[3].stamina.before).toBe(0);
    expect(logs[3].staminaUnderlying.before).toBe(-15);
    expect(logs.length).toBe(4);
  });

  it('is correct with < 1 recovery rate and awake for 56400 secs', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 0.8,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      recoveryRate,
      session: {
        primary: {
          start: 63600,
          end: 0,
        },
        secondary: {
          start: 24000,
          end: 31200,
        },
      },
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'optimistic',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(60);
    expect(logs[0].staminaUnderlying.after).toBe(60);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(24000);
    expect(logs[1].stamina.before).toBe(20);
    expect(logs[1].stamina.after).toBe(20);
    expect(logs[1].staminaUnderlying.before).toBe(20);
    expect(logs[1].staminaUnderlying.after).toBe(20);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(31200);
    expect(logs[2].stamina.before).toBe(8);
    expect(logs[2].stamina.after).toBe(27);
    expect(logs[2].staminaUnderlying.before).toBe(8);
    expect(logs[2].staminaUnderlying.after).toBe(27);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63600);
    expect(logs[3].stamina.before).toBe(0);
    expect(logs[3].stamina.after).toBe(0);
    expect(logs[3].staminaUnderlying.before).toBe(-27);
    expect(logs[3].staminaUnderlying.after).toBe(-27);
    expect(logs.length).toBe(4);
  });

  it('is correct with < 1 recovery rate and awake for 62400 secs', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 0.8,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      recoveryRate,
      session: {
        primary: {
          start: 69600,
          end: 0,
        },
        secondary: {
          start: 30000,
          end: 37200,
        },
      },
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'optimistic',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(44);
    expect(logs[0].staminaUnderlying.after).toBe(44);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(30000);
    expect(logs[1].stamina.before).toBe(0);
    expect(logs[1].stamina.after).toBe(0);
    expect(logs[1].staminaUnderlying.before).toBe(-6);
    expect(logs[1].staminaUnderlying.after).toBe(-6);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(37200);
    expect(logs[2].stamina.before).toBe(0);
    expect(logs[2].stamina.after).toBe(19);
    expect(logs[2].staminaUnderlying.before).toBe(-18);
    expect(logs[2].staminaUnderlying.after).toBe(1);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(69600);
    expect(logs[3].stamina.before).toBe(0);
    expect(logs[3].stamina.after).toBe(0);
    expect(logs[3].staminaUnderlying.before).toBe(-53);
    expect(logs[3].staminaUnderlying.after).toBe(-53);
    expect(logs.length).toBe(4);
  });

  it('is correct with < 1 recovery rate and awake for 68400 secs', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 0.8,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      recoveryRate,
      session: {
        primary: {
          start: 75600,
          end: 0,
        },
        secondary: {
          start: 36000,
          end: 43200,
        },
      },
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'optimistic',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(29);
    expect(logs[0].staminaUnderlying.after).toBe(29);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(36000);
    expect(logs[1].stamina.before).toBe(0);
    expect(logs[1].stamina.after).toBe(0);
    expect(logs[1].staminaUnderlying.before).toBe(-31);
    expect(logs[1].staminaUnderlying.after).toBe(-31);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(43200);
    expect(logs[2].stamina.before).toBe(0);
    expect(logs[2].stamina.after).toBe(19);
    expect(logs[2].staminaUnderlying.before).toBe(-43);
    expect(logs[2].staminaUnderlying.after).toBe(-24);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(75600);
    expect(logs[3].stamina.before).toBe(0);
    expect(logs[3].stamina.after).toBe(0);
    expect(logs[3].staminaUnderlying.before).toBe(-78);
    expect(logs[3].staminaUnderlying.after).toBe(-78);
    expect(logs.length).toBe(4);
  });

  it('does not allow total recovery to go beyond 100 without any buff', () => {
    const sessionInfo = getSleepSessionInfo({
      recoveryRate,
      session: {
        primary: {
          start: 0, // 00:00
          end: 14400, // 04:00
        },
        secondary: {
          start: 25200, // 07:00
          end: 41400, // 11:30
        },
      },
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'optimistic',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(48);
    expect(logs[0].staminaUnderlying.after).toBe(48);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(10800);
    expect(logs[1].stamina.before).toBe(30);
    expect(logs[1].stamina.after).toBe(30);
    expect(logs[1].staminaUnderlying.before).toBe(30);
    expect(logs[1].staminaUnderlying.after).toBe(30);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(27000);
    expect(logs[2].stamina.before).toBe(3);
    expect(logs[2].stamina.after).toBe(55);
    expect(logs[2].staminaUnderlying.before).toBe(3);
    expect(logs[2].staminaUnderlying.after).toBe(55);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(72000);
    expect(logs[3].stamina.before).toBe(0);
    expect(logs[3].stamina.after).toBe(0);
    expect(logs[3].staminaUnderlying.before).toBe(-20);
    expect(logs[3].staminaUnderlying.after).toBe(-20);
    expect(logs.length).toBe(4);
  });

  it('does not allow total recovery amount go beyond 100 even with recovery rate up', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1.2,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      recoveryRate,
      session: {
        primary: {
          start: 0, // 00:00
          end: 14400, // 04:00
        },
        secondary: {
          start: 43200, // 12:00
          end: 59400, // 16:30
        },
      },
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'optimistic',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(57);
    expect(logs[0].staminaUnderlying.after).toBe(57);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(28800);
    expect(logs[1].stamina.before).toBe(9);
    expect(logs[1].stamina.after).toBe(9);
    expect(logs[1].staminaUnderlying.before).toBe(9);
    expect(logs[1].staminaUnderlying.after).toBe(9);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(45000);
    expect(logs[2].stamina.before).toBe(0);
    expect(logs[2].stamina.after).toBe(43);
    expect(logs[2].staminaUnderlying.before).toBe(-18);
    expect(logs[2].staminaUnderlying.after).toBe(25);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(72000);
    expect(logs[3].stamina.before).toBe(0);
    expect(logs[3].stamina.after).toBe(0);
    expect(logs[3].staminaUnderlying.before).toBe(-20);
    expect(logs[3].staminaUnderlying.after).toBe(-20);
    expect(logs.length).toBe(4);
  });
});
