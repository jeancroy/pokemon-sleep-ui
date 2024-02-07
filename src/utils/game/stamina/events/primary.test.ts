import {describe, expect, it} from '@jest/globals';

import {testCookingRecoveryData} from '@/tests/data/game/cookingRecovery';
import {StaminaGeneralRecoveryConfig} from '@/types/game/stamina/general';
import {StaminaRecoveryRateConfig} from '@/types/game/stamina/recovery';
import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {getSleepSessionInfo} from '@/utils/game/sleep';
import {getLogsWithPrimarySleep} from '@/utils/game/stamina/events/primary';


describe('Stamina / Event Log (+Primary)', () => {
  const recoveryRate: StaminaRecoveryRateConfig = {
    general: 1,
    sleep: 1,
  };

  it('is correct with energy never hitting 0 under optimistic', () => {
    const sleepSessionInfo = getSleepSessionInfo({
      recoveryRate,
      sleepSession: {
        primary: {
          start: 57600, // 16:00
          end: 0, // 00:00
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

    const logs = getLogsWithPrimarySleep({
      sleepSessionInfo,
      general,
      skillTriggers,
      recoveryRate,
      cookingRecoveryData: testCookingRecoveryData,
    });

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(137);
    expect(logs[0].staminaUnderlying.after).toBe(137);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(57600);
    expect(logs[1].stamina.before).toBe(41);
    expect(logs[1].staminaUnderlying.before).toBe(41);
    expect(logs.length).toBe(2);
  });

  it('is correct with energy never hitting 0 under conservative', () => {
    const sleepSessionInfo = getSleepSessionInfo({
      recoveryRate,
      sleepSession: {
        primary: {
          start: 57600, // 16:00
          end: 0, // 00:00
        },
        secondary: null,
      },
    });
    const general: StaminaGeneralRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 3, amount: 9},
    ];

    const logs = getLogsWithPrimarySleep({
      sleepSessionInfo,
      general,
      skillTriggers,
      recoveryRate,
      cookingRecoveryData: testCookingRecoveryData,
    });

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(95);
    expect(logs[0].staminaUnderlying.after).toBe(95);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(57600);
    expect(logs[1].stamina.before).toBe(0);
    expect(logs[1].staminaUnderlying.before).toBe(-1);
    expect(logs.length).toBe(2);
  });

  it('is correct with energy hitting 0', () => {
    const sleepSessionInfo = getSleepSessionInfo({
      recoveryRate,
      sleepSession: {
        primary: {
          start: 81000, // 22:30
          end: 0, // 00:00
        },
        secondary: null,
      },
    });
    const general: StaminaGeneralRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 0, amount: 9},
    ];

    const logs = getLogsWithPrimarySleep({
      sleepSessionInfo,
      general,
      skillTriggers,
      recoveryRate,
      cookingRecoveryData: testCookingRecoveryData,
    });

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(18);
    expect(logs[0].staminaUnderlying.after).toBe(18);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(81000);
    expect(logs[1].stamina.before).toBe(0);
    expect(logs[1].staminaUnderlying.before).toBe(-117);
    expect(logs.length).toBe(2);
  });

  it('is correct with > 1 recovery rate under optimistic', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1.2,
      sleep: 1,
    };
    const sleepSessionInfo = getSleepSessionInfo({
      recoveryRate,
      sleepSession: {
        primary: {
          start: 57600, // 16:00
          end: 0, // 00:00
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

    const logs = getLogsWithPrimarySleep({
      sleepSessionInfo,
      general,
      skillTriggers,
      recoveryRate,
      cookingRecoveryData: testCookingRecoveryData,
    });

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(148);
    expect(logs[0].staminaUnderlying.after).toBe(148);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(57600);
    expect(logs[1].stamina.before).toBe(52);
    expect(logs[1].staminaUnderlying.before).toBe(52);
    expect(logs.length).toBe(2);
  });

  it('is correct with < 1 recovery rate and daily loss > daily recovery', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 0.8,
      sleep: 1,
    };
    const sleepSessionInfo = getSleepSessionInfo({
      recoveryRate,
      sleepSession: {
        primary: {
          start: 54000, // 15:00
          end: 0, // 00:00
        },
        secondary: null,
      },
    });
    const general: StaminaGeneralRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 0, amount: 9},
    ];

    const logs = getLogsWithPrimarySleep({
      sleepSessionInfo,
      general,
      skillTriggers,
      recoveryRate,
      cookingRecoveryData: testCookingRecoveryData,
    });

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(80);
    expect(logs[0].staminaUnderlying.after).toBe(80);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(54000);
    expect(logs[1].stamina.before).toBe(0);
    expect(logs[1].staminaUnderlying.before).toBe(-10);
    expect(logs.length).toBe(2);
  });

  it('is correct with < 1 recovery rate under conservative', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 0.8,
      sleep: 1,
    };
    const sleepSessionInfo = getSleepSessionInfo({
      recoveryRate,
      sleepSession: {
        primary: {
          start: 64800, // 18:00
          end: 0, // 00:00
        },
        secondary: null,
      },
    });
    const general: StaminaGeneralRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 0, amount: 9},
    ];

    const logs = getLogsWithPrimarySleep({
      sleepSessionInfo,
      general,
      skillTriggers,
      recoveryRate,
      cookingRecoveryData: testCookingRecoveryData,
    });

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(57);
    expect(logs[0].staminaUnderlying.after).toBe(57);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(64800);
    expect(logs[1].stamina.before).toBe(0);
    expect(logs[1].staminaUnderlying.before).toBe(-51);
    expect(logs.length).toBe(2);
  });

  it('is correct with < 1 recovery rate under conservative with skill recovery', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 0.8,
      sleep: 1,
    };
    const sleepSessionInfo = getSleepSessionInfo({
      recoveryRate,
      sleepSession: {
        primary: {
          start: 64800, // 18:00
          end: 0, // 00:00
        },
        secondary: null,
      },
    });
    const general: StaminaGeneralRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 2, amount: 9},
    ];

    const logs = getLogsWithPrimarySleep({
      sleepSessionInfo,
      general,
      skillTriggers,
      recoveryRate,
      cookingRecoveryData: testCookingRecoveryData,
    });

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(57);
    expect(logs[0].staminaUnderlying.after).toBe(57);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(64800);
    expect(logs[1].stamina.before).toBe(0);
    expect(logs[1].staminaUnderlying.before).toBe(-51);
    expect(logs.length).toBe(2);
  });

  it('caps single recovery at 100', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1.2,
      sleep: 1,
    };
    const sleepSessionInfo = getSleepSessionInfo({
      recoveryRate,
      sleepSession: {
        primary: {
          start: 56700, // 15:45
          end: 0, // 00:00
        },
        secondary: null,
      },
    });
    const general: StaminaGeneralRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [];

    const logs = getLogsWithPrimarySleep({
      sleepSessionInfo,
      general,
      skillTriggers,
      recoveryRate,
      cookingRecoveryData: testCookingRecoveryData,
    });

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(100);
    expect(logs[0].staminaUnderlying.after).toBe(100);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(56700);
    expect(logs[1].stamina.before).toBe(5.5);
    expect(logs[1].staminaUnderlying.before).toBe(5.5);
    expect(logs.length).toBe(2);
  });
});
