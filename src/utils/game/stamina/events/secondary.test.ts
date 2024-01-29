import {describe, expect, it} from '@jest/globals';

import {testCookingRecoveryData} from '@/tests/data/game/cookingRecovery';
import {StaminaSleepSessionConfig} from '@/types/game/stamina/config';
import {StaminaGeneralRecoveryConfig} from '@/types/game/stamina/general';
import {StaminaRecoveryRateConfig} from '@/types/game/stamina/recovery';
import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';
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
  const sleepSessionInfo = getSleepSessionInfo({
    recoveryRate,
    sleepSession: defaultSessionConfig,
  });

  it('is correct under optimistic', () => {
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

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(119);
    expect(logs[0].staminaUnderlying.after).toBe(119);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(25200);
    expect(logs[1].stamina.before).toBe(77);
    expect(logs[1].stamina.after).toBe(77);
    expect(logs[1].staminaUnderlying.before).toBe(77);
    expect(logs[1].staminaUnderlying.after).toBe(77);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(30600);
    expect(logs[2].stamina.before).toBe(68);
    expect(logs[2].stamina.after).toBe(86);
    expect(logs[2].staminaUnderlying.before).toBe(68);
    expect(logs[2].staminaUnderlying.after).toBe(86);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63000);
    expect(logs[3].stamina.before).toBe(32);
    expect(logs[3].stamina.after).toBe(32);
    expect(logs[3].staminaUnderlying.before).toBe(32);
    expect(logs[3].staminaUnderlying.after).toBe(32);
    expect(logs.length).toBe(4);
  });

  it('is correct under conservative', () => {
    const general: StaminaGeneralRecoveryConfig = {
      strategy: 'conservative',
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
    const sleepSessionInfo = getSleepSessionInfo({
      recoveryRate,
      sleepSession: {
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
    const general: StaminaGeneralRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 0, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({
      sleepSessionInfo,
      general,
      skillTriggers,
      recoveryRate,
      cookingRecoveryData: testCookingRecoveryData,
    });
    logs = getLogsWithSecondarySleep({logs, sleepSessionInfo, general});

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
    const sleepSessionInfo = getSleepSessionInfo({
      recoveryRate,
      sleepSession: defaultSessionConfig,
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

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(144);
    expect(logs[0].staminaUnderlying.after).toBe(144);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(25200);
    expect(logs[1].stamina.before).toBe(102);
    expect(logs[1].stamina.after).toBe(102);
    expect(logs[1].staminaUnderlying.before).toBe(102);
    expect(logs[1].staminaUnderlying.after).toBe(102);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(30600);
    expect(logs[2].stamina.before).toBe(93);
    expect(logs[2].stamina.after).toBe(115);
    expect(logs[2].staminaUnderlying.before).toBe(93);
    expect(logs[2].staminaUnderlying.after).toBe(115);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63000);
    expect(logs[3].stamina.before).toBe(61);
    expect(logs[3].stamina.after).toBe(61);
    expect(logs[3].staminaUnderlying.before).toBe(61);
    expect(logs[3].staminaUnderlying.after).toBe(61);
    expect(logs.length).toBe(4);
  });

  it('is correct with < 1 recovery rate under optimistic', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 0.8,
      sleep: 1,
    };
    const sleepSessionInfo = getSleepSessionInfo({
      recoveryRate,
      sleepSession: defaultSessionConfig,
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

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(98);
    expect(logs[0].staminaUnderlying.after).toBe(98);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(25200);
    expect(logs[1].stamina.before).toBe(56);
    expect(logs[1].stamina.after).toBe(56);
    expect(logs[1].staminaUnderlying.before).toBe(56);
    expect(logs[1].staminaUnderlying.after).toBe(56);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(30600);
    expect(logs[2].stamina.before).toBe(47);
    expect(logs[2].stamina.after).toBe(62);
    expect(logs[2].staminaUnderlying.before).toBe(47);
    expect(logs[2].staminaUnderlying.after).toBe(62);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63000);
    expect(logs[3].stamina.before).toBe(8);
    expect(logs[3].stamina.after).toBe(8);
    expect(logs[3].staminaUnderlying.before).toBe(8);
    expect(logs[3].staminaUnderlying.after).toBe(8);
    expect(logs.length).toBe(4);
  });

  it('is correct with > 1 recovery rate under conservative', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1.2,
      sleep: 1,
    };
    const sleepSessionInfo = getSleepSessionInfo({
      recoveryRate,
      sleepSession: defaultSessionConfig,
    });
    const general: StaminaGeneralRecoveryConfig = {
      strategy: 'conservative',
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

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(93);
    expect(logs[0].staminaUnderlying.after).toBe(93);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(25200);
    expect(logs[1].stamina.before).toBe(51);
    expect(logs[1].stamina.after).toBe(51);
    expect(logs[1].staminaUnderlying.before).toBe(51);
    expect(logs[1].staminaUnderlying.after).toBe(51);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(30600);
    expect(logs[2].stamina.before).toBe(42);
    expect(logs[2].stamina.after).toBe(64);
    expect(logs[2].staminaUnderlying.before).toBe(42);
    expect(logs[2].staminaUnderlying.after).toBe(64);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63000);
    expect(logs[3].stamina.before).toBe(10);
    expect(logs[3].stamina.after).toBe(10);
    expect(logs[3].staminaUnderlying.before).toBe(10);
    expect(logs[3].staminaUnderlying.after).toBe(10);
    expect(logs.length).toBe(4);
  });

  it('is correct with < 1 recovery rate under conservative', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 0.8,
      sleep: 1,
    };
    const sleepSessionInfo = getSleepSessionInfo({
      recoveryRate,
      sleepSession: defaultSessionConfig,
    });
    const general: StaminaGeneralRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 0, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({
      sleepSessionInfo,
      general,
      skillTriggers,
      recoveryRate,
      cookingRecoveryData: testCookingRecoveryData,
    });
    logs = getLogsWithSecondarySleep({logs, sleepSessionInfo, general});

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
    const sleepSessionInfo = getSleepSessionInfo({
      recoveryRate,
      sleepSession: defaultSessionConfig,
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
    const sleepSessionInfo = getSleepSessionInfo({
      recoveryRate,
      sleepSession: {
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
    const general: StaminaGeneralRecoveryConfig = {
      strategy: 'optimistic',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [];

    let logs = getLogsWithPrimarySleep({
      sleepSessionInfo,
      general,
      skillTriggers,
      recoveryRate,
      cookingRecoveryData: testCookingRecoveryData,
    });
    logs = getLogsWithSecondarySleep({logs, sleepSessionInfo, general});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(88);
    expect(logs[0].staminaUnderlying.after).toBe(88);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(18000);
    expect(logs[1].stamina.before).toBe(58);
    expect(logs[1].stamina.after).toBe(58);
    expect(logs[1].staminaUnderlying.before).toBe(58);
    expect(logs[1].staminaUnderlying.after).toBe(58);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(25200);
    expect(logs[2].stamina.before).toBe(46);
    expect(logs[2].stamina.after).toBe(50);
    expect(logs[2].staminaUnderlying.before).toBe(46);
    expect(logs[2].staminaUnderlying.after).toBe(50);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(57600);
    expect(logs[3].stamina.before).toBe(0);
    expect(logs[3].staminaUnderlying.before).toBe(-4);
    expect(logs.length).toBe(4);
  });

  it('is correct with < 1 recovery rate and awake for 56400 secs', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 0.8,
      sleep: 1,
    };
    const sleepSessionInfo = getSleepSessionInfo({
      recoveryRate,
      sleepSession: {
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
    const general: StaminaGeneralRecoveryConfig = {
      strategy: 'optimistic',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [];

    let logs = getLogsWithPrimarySleep({
      sleepSessionInfo,
      general,
      skillTriggers,
      recoveryRate,
      cookingRecoveryData: testCookingRecoveryData,
    });
    logs = getLogsWithSecondarySleep({logs, sleepSessionInfo, general});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(72);
    expect(logs[0].staminaUnderlying.after).toBe(72);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(24000);
    expect(logs[1].stamina.before).toBe(32);
    expect(logs[1].stamina.after).toBe(32);
    expect(logs[1].staminaUnderlying.before).toBe(32);
    expect(logs[1].staminaUnderlying.after).toBe(32);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(31200);
    expect(logs[2].stamina.before).toBe(20);
    expect(logs[2].stamina.after).toBe(40);
    expect(logs[2].staminaUnderlying.before).toBe(20);
    expect(logs[2].staminaUnderlying.after).toBe(40);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63600);
    expect(logs[3].stamina.before).toBe(0);
    expect(logs[3].stamina.after).toBe(0);
    expect(logs[3].staminaUnderlying.before).toBe(-14);
    expect(logs[3].staminaUnderlying.after).toBe(-14);
    expect(logs.length).toBe(4);
  });

  it('is correct with < 1 recovery rate and awake for 62400 secs', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 0.8,
      sleep: 1,
    };
    const sleepSessionInfo = getSleepSessionInfo({
      recoveryRate,
      sleepSession: {
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
    const general: StaminaGeneralRecoveryConfig = {
      strategy: 'optimistic',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [];

    let logs = getLogsWithPrimarySleep({
      sleepSessionInfo,
      general,
      skillTriggers,
      recoveryRate,
      cookingRecoveryData: testCookingRecoveryData,
    });
    logs = getLogsWithSecondarySleep({logs, sleepSessionInfo, general});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(56);
    expect(logs[0].staminaUnderlying.after).toBe(56);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(30000);
    expect(logs[1].stamina.before).toBe(6);
    expect(logs[1].stamina.after).toBe(6);
    expect(logs[1].staminaUnderlying.before).toBe(6);
    expect(logs[1].staminaUnderlying.after).toBe(6);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(37200);
    expect(logs[2].stamina.before).toBe(0);
    expect(logs[2].stamina.after).toBe(20);
    expect(logs[2].staminaUnderlying.before).toBe(-6);
    expect(logs[2].staminaUnderlying.after).toBe(14);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(69600);
    expect(logs[3].stamina.before).toBe(0);
    expect(logs[3].stamina.after).toBe(0);
    expect(logs[3].staminaUnderlying.before).toBe(-40);
    expect(logs[3].staminaUnderlying.after).toBe(-40);
    expect(logs.length).toBe(4);
  });

  it('is correct with < 1 recovery rate and awake for 68400 secs', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 0.8,
      sleep: 1,
    };
    const sleepSessionInfo = getSleepSessionInfo({
      recoveryRate,
      sleepSession: {
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
    const general: StaminaGeneralRecoveryConfig = {
      strategy: 'optimistic',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [];

    let logs = getLogsWithPrimarySleep({
      sleepSessionInfo,
      general,
      skillTriggers,
      recoveryRate,
      cookingRecoveryData: testCookingRecoveryData,
    });
    logs = getLogsWithSecondarySleep({logs, sleepSessionInfo, general});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(41);
    expect(logs[0].staminaUnderlying.after).toBe(41);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(36000);
    expect(logs[1].stamina.before).toBe(0);
    expect(logs[1].stamina.after).toBe(0);
    expect(logs[1].staminaUnderlying.before).toBe(-19);
    expect(logs[1].staminaUnderlying.after).toBe(-19);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(43200);
    expect(logs[2].stamina.before).toBe(0);
    expect(logs[2].stamina.after).toBe(20);
    expect(logs[2].staminaUnderlying.before).toBe(-31);
    expect(logs[2].staminaUnderlying.after).toBe(-11);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(75600);
    expect(logs[3].stamina.before).toBe(0);
    expect(logs[3].stamina.after).toBe(0);
    expect(logs[3].staminaUnderlying.before).toBe(-65);
    expect(logs[3].staminaUnderlying.after).toBe(-65);
    expect(logs.length).toBe(4);
  });

  it('does not allow total recovery to go beyond 100 without any buff', () => {
    const sleepSessionInfo = getSleepSessionInfo({
      recoveryRate,
      sleepSession: {
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
    const general: StaminaGeneralRecoveryConfig = {
      strategy: 'optimistic',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [];

    let logs = getLogsWithPrimarySleep({
      sleepSessionInfo,
      general,
      skillTriggers,
      recoveryRate,
      cookingRecoveryData: testCookingRecoveryData,
    });
    logs = getLogsWithSecondarySleep({logs, sleepSessionInfo, general});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(63);
    expect(logs[0].staminaUnderlying.after).toBe(63);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(10800);
    expect(logs[1].stamina.before).toBe(45);
    expect(logs[1].stamina.after).toBe(45);
    expect(logs[1].staminaUnderlying.before).toBe(45);
    expect(logs[1].staminaUnderlying.after).toBe(45);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(27000);
    expect(logs[2].stamina.before).toBe(18);
    expect(logs[2].stamina.after).toBe(70);
    expect(logs[2].staminaUnderlying.before).toBe(18);
    expect(logs[2].staminaUnderlying.after).toBe(70);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(72000);
    expect(logs[3].stamina.before).toBe(0);
    expect(logs[3].stamina.after).toBe(0);
    expect(logs[3].staminaUnderlying.before).toBe(-5);
    expect(logs[3].staminaUnderlying.after).toBe(-5);
    expect(logs.length).toBe(4);
  });

  it('allows total recovery amount go beyond 100 with recovery rate up', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1.2,
      sleep: 1,
    };
    const sleepSessionInfo = getSleepSessionInfo({
      recoveryRate,
      sleepSession: {
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
    const general: StaminaGeneralRecoveryConfig = {
      strategy: 'optimistic',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [];

    let logs = getLogsWithPrimarySleep({
      sleepSessionInfo,
      general,
      skillTriggers,
      recoveryRate,
      cookingRecoveryData: testCookingRecoveryData,
    });
    logs = getLogsWithSecondarySleep({logs, sleepSessionInfo, general});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(76);
    expect(logs[0].staminaUnderlying.after).toBe(76);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(28800);
    expect(logs[1].stamina.before).toBe(28);
    expect(logs[1].stamina.after).toBe(28);
    expect(logs[1].staminaUnderlying.before).toBe(28);
    expect(logs[1].staminaUnderlying.after).toBe(28);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(45000);
    expect(logs[2].stamina.before).toBe(1);
    expect(logs[2].stamina.after).toBe(64);
    expect(logs[2].staminaUnderlying.before).toBe(1);
    expect(logs[2].staminaUnderlying.after).toBe(64);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(72000);
    expect(logs[3].stamina.before).toBe(19);
    expect(logs[3].stamina.after).toBe(19);
    expect(logs[3].staminaUnderlying.before).toBe(19);
    expect(logs[3].staminaUnderlying.after).toBe(19);
    expect(logs.length).toBe(4);
  });

  it('caps single recovery over 100 on wakeup', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 2,
      sleep: 1,
    };
    const sleepSessionInfo = getSleepSessionInfo({
      recoveryRate,
      sleepSession: {
        primary: {
          start: 77400, // 21:30
          end: 0, // 00:00
        },
        secondary: {
          start: 7200, // 02:00
          end: 28800, // 08:00
        },
      },
    });
    const general: StaminaGeneralRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [];

    let logs = getLogsWithPrimarySleep({
      sleepSessionInfo,
      general,
      skillTriggers,
      recoveryRate,
      cookingRecoveryData: testCookingRecoveryData,
    });
    logs = getLogsWithSecondarySleep({logs, sleepSessionInfo, general});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(60);
    expect(logs[0].staminaUnderlying.after).toBe(60);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(7200);
    expect(logs[1].stamina.before).toBe(48);
    expect(logs[1].stamina.after).toBe(48);
    expect(logs[1].staminaUnderlying.before).toBe(48);
    expect(logs[1].staminaUnderlying.after).toBe(48);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(28800);
    expect(logs[2].stamina.before).toBe(12);
    expect(logs[2].stamina.after).toBe(100);
    expect(logs[2].staminaUnderlying.before).toBe(12);
    expect(logs[2].staminaUnderlying.after).toBe(100);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(77400);
    expect(logs[3].stamina.before).toBe(19);
    expect(logs[3].stamina.after).toBe(19);
    expect(logs[3].staminaUnderlying.before).toBe(19);
    expect(logs[3].staminaUnderlying.after).toBe(19);
    expect(logs.length).toBe(4);
  });
});
