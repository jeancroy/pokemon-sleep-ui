import {describe, expect, it} from '@jest/globals';

import {StaminaRecoveryRateConfig} from '@/types/game/stamina/config';
import {StaminaSkillRecoveryConfig, StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {getSleepSessionInfo} from '@/utils/game/sleep';
import {getLogsWithPrimarySleep} from '@/utils/game/stamina/events/primary';


describe('Stamina Event Log (+Primary)', () => {
  it('is correct with energy never hitting 0 under optimistic', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 57600, // 16:00
        end: 0, // 00:00
      },
      secondary: null,
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'optimistic',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 3, amount: 9},
    ];

    const logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(127);
    expect(logs[0].staminaUnderlying.after).toBe(127);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(57600);
    expect(logs[1].stamina.before).toBe(31);
    expect(logs[1].staminaUnderlying.before).toBe(31);
    expect(logs.length).toBe(2);
  });

  it('is correct with energy never hitting 0 under conservative', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 57600, // 16:00
        end: 0, // 00:00
      },
      secondary: null,
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 3, amount: 9},
    ];

    const logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(100);
    expect(logs[0].staminaUnderlying.after).toBe(100);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(57600);
    expect(logs[1].stamina.before).toBe(4);
    expect(logs[1].staminaUnderlying.before).toBe(4);
    expect(logs.length).toBe(2);
  });

  it('is correct with energy hitting 0', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 81000, // 22:30
        end: 0, // 00:00
      },
      secondary: null,
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 0, amount: 9},
    ];

    const logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(65);
    expect(logs[0].staminaUnderlying.after).toBe(65);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(81000);
    expect(logs[1].stamina.before).toBe(0);
    expect(logs[1].staminaUnderlying.before).toBe(-70);
    expect(logs.length).toBe(2);
  });

  it('is correct with > 1 recovery rate under optimistic', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1.2,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 57600, // 16:00
        end: 0, // 00:00
      },
      secondary: null,
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'optimistic',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 3, amount: 9},
    ];

    const logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(133);
    expect(logs[0].staminaUnderlying.after).toBe(133);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(57600);
    expect(logs[1].stamina.before).toBe(37);
    expect(logs[1].staminaUnderlying.before).toBe(37);
    expect(logs.length).toBe(2);
  });

  it('is correct with < 1 recovery rate and daily loss > daily recovery', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 0.8,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 54000, // 15:00
        end: 0, // 00:00
      },
      secondary: null,
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 0, amount: 9},
    ];

    const logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(90);
    expect(logs[0].staminaUnderlying.after).toBe(90);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(54000);
    expect(logs[1].stamina.before).toBe(0);
    expect(logs[1].staminaUnderlying.before).toBe(0);
    expect(logs.length).toBe(2);
  });

  it('is correct with < 1 recovery rate under conservative', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 0.8,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 64800, // 18:00
        end: 0, // 00:00
      },
      secondary: null,
    });
    const skillRecovery: StaminaSkillRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 0, amount: 9},
    ];

    const logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(72);
    expect(logs[0].staminaUnderlying.after).toBe(72);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(64800);
    expect(logs[1].stamina.before).toBe(0);
    expect(logs[1].staminaUnderlying.before).toBe(-36);
    expect(logs.length).toBe(2);
  });

  it('is correct with < 1 recovery rate under conservative with skill recovery', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 0.8,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 64800, // 18:00
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

    const logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(88);
    expect(logs[0].staminaUnderlying.after).toBe(88);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(64800);
    expect(logs[1].stamina.before).toBe(0);
    expect(logs[1].staminaUnderlying.before).toBe(-20);
    expect(logs.length).toBe(2);
  });
});
