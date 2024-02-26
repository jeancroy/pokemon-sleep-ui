import {describe, expect, it} from '@jest/globals';

import {testCookingRecoveryData} from '@/tests/data/game/cookingRecovery';
import {StaminaGeneralRecoveryConfig} from '@/types/game/stamina/general';
import {StaminaRecoveryRateConfig} from '@/types/game/stamina/recovery';
import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {getSleepSessionInfo} from '@/utils/game/sleep';
import {getLogsWithEfficiencyBlock} from '@/utils/game/stamina/events/block';
import {getLogsWithEndOfPeriodMark} from '@/utils/game/stamina/events/endOfPeriod';
import {getLogsWithPrimarySleep} from '@/utils/game/stamina/events/primary';
import {getLogsWithSecondarySleep} from '@/utils/game/stamina/events/secondary';
import {getLogsWithSkillRecovery} from '@/utils/game/stamina/events/skill';


describe('Stamina / Event Log (+Efficiency Block)', () => {
  const recoveryRate: StaminaRecoveryRateConfig = {
    general: 1,
    sleep: 1,
  };

  it('is correct with secondary sleep before any skill trigger under conservative', () => {
    const sleepSessionInfo = getSleepSessionInfo({
      recoveryRate,
      sleepSession: {
        primary: {
          start: 84600, // 23:30
          end: 21600, // 06:00
        },
        secondary: {
          start: 25200, // 07:00
          end: 30600, // 08:30
        },
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
    logs = getLogsWithEndOfPeriodMark({logs});
    logs = getLogsWithEfficiencyBlock({logs});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(77);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(3600);
    expect(logs[1].stamina.before).toBe(71);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(9000);
    expect(logs[2].stamina.after).toBe(80);
    expect(logs[3].type).toBe('efficiencyBlock');
    expect(logs[3].timing).toBe(9000);
    expect(logs[3].stamina.before).toBe(80);
    expect(logs[3].stamina.after).toBe(80);
    expect(logs[4].type).toBe('efficiencyBlock');
    expect(logs[4].timing).toBe(21000);
    expect(logs[4].stamina.before).toBe(60);
    expect(logs[4].stamina.after).toBe(60);
    expect(logs[5].type).toBe('efficiencyBlock');
    expect(logs[5].timing).toBe(33000);
    expect(logs[5].stamina.before).toBe(40);
    expect(logs[5].stamina.after).toBe(40);
    expect(logs[6].type).toBe('skillRecovery');
    expect(logs[6].timing).toBe(34200);
    expect(logs[6].stamina.before).toBe(38);
    expect(logs[6].stamina.after).toBe(47);
    expect(logs[7].type).toBe('efficiencyBlock');
    expect(logs[7].timing).toBe(38400);
    expect(logs[7].stamina.before).toBe(40);
    expect(logs[7].stamina.after).toBe(40);
    expect(logs[8].type).toBe('efficiencyBlock');
    expect(logs[8].timing).toBe(50400);
    expect(logs[8].stamina.before).toBe(20);
    expect(logs[8].stamina.after).toBe(20);
    expect(logs[9].type).toBe('efficiencyBlock');
    expect(logs[9].timing).toBe(62400);
    expect(logs[9].stamina.before).toBe(0);
    expect(logs[9].stamina.after).toBe(0);
    expect(logs[10].type).toBe('sleep');
    expect(logs[10].timing).toBe(63000);
    expect(logs[10].stamina.before).toBe(0);
    expect(logs[11].type).toBe('endOfPeriod');
    expect(logs[11].timing).toBe(86400);
    expect(logs[11].stamina.before).toBe(0);
    expect(logs.length).toBe(12);
  });

  it('is correct with secondary sleep after a skill trigger under conservative', () => {
    const sleepSessionInfo = getSleepSessionInfo({
      recoveryRate,
      sleepSession: {
        primary: {
          start: 84600, // 23:30
          end: 21600, // 06:00
        },
        secondary: {
          start: 46800, // 13:00
          end: 52200, // 14:30
        },
      },
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
    logs = getLogsWithSkillRecovery({sleepSessionInfo, general, skillTriggers, logs, recoveryRate});
    logs = getLogsWithEndOfPeriodMark({logs});
    logs = getLogsWithEfficiencyBlock({logs});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(77);
    expect(logs[1].type).toBe('efficiencyBlock');
    expect(logs[1].timing).toBe(10200);
    expect(logs[1].stamina.before).toBe(60);
    expect(logs[1].stamina.after).toBe(60);
    expect(logs[2].type).toBe('skillRecovery');
    expect(logs[2].timing).toBe(14400);
    expect(logs[2].stamina.before).toBe(53);
    expect(logs[2].stamina.after).toBe(62);
    expect(logs[3].type).toBe('efficiencyBlock');
    expect(logs[3].timing).toBe(15600);
    expect(logs[3].stamina.before).toBe(60);
    expect(logs[3].stamina.after).toBe(60);
    expect(logs[4].type).toBe('sleep');
    expect(logs[4].timing).toBe(25200);
    expect(logs[4].stamina.before).toBe(44);
    expect(logs[5].type).toBe('efficiencyBlock');
    expect(logs[5].timing).toBe(27600);
    expect(logs[5].stamina.before).toBe(40);
    expect(logs[6].type).toBe('wakeup');
    expect(logs[6].timing).toBe(30600);
    expect(logs[6].stamina.after).toBe(53);
    expect(logs[7].type).toBe('skillRecovery');
    expect(logs[7].timing).toBe(34200);
    expect(logs[7].stamina.before).toBe(47);
    expect(logs[7].stamina.after).toBe(56);
    expect(logs[8].type).toBe('efficiencyBlock');
    expect(logs[8].timing).toBe(43800);
    expect(logs[8].stamina.before).toBe(40);
    expect(logs[8].stamina.after).toBe(40);
    expect(logs[9].type).toBe('skillRecovery');
    expect(logs[9].timing).toBe(48600);
    expect(logs[9].stamina.before).toBe(32);
    expect(logs[9].stamina.after).toBe(41);
    expect(logs[10].type).toBe('efficiencyBlock');
    expect(logs[10].timing).toBe(49200);
    expect(logs[10].stamina.before).toBe(40);
    expect(logs[10].stamina.after).toBe(40);
    expect(logs[11].type).toBe('efficiencyBlock');
    expect(logs[11].timing).toBe(61200);
    expect(logs[11].stamina.before).toBe(20);
    expect(logs[11].stamina.after).toBe(20);
    expect(logs[12].type).toBe('sleep');
    expect(logs[12].timing).toBe(63000);
    expect(logs[12].stamina.before).toBe(17);
    expect(logs[13].type).toBe('efficiencyBlock');
    expect(logs[13].timing).toBe(73200);
    expect(logs[13].stamina.before).toBe(0);
    expect(logs[13].stamina.after).toBe(0);
    expect(logs[14].type).toBe('endOfPeriod');
    expect(logs[14].timing).toBe(86400);
    expect(logs[14].stamina.before).toBe(0);
    expect(logs.length).toBe(15);
  });

  it('is correct with secondary sleep without any skill trigger', () => {
    const sleepSessionInfo = getSleepSessionInfo({
      recoveryRate,
      sleepSession: {
        primary: {
          start: 84600, // 23:30
          end: 21600, // 06:00
        },
        secondary: {
          start: 25200, // 07:00
          end: 30600, // 08:30
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
    logs = getLogsWithSkillRecovery({sleepSessionInfo, general, skillTriggers, logs, recoveryRate});
    logs = getLogsWithEndOfPeriodMark({logs});
    logs = getLogsWithEfficiencyBlock({logs});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(77);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(3600);
    expect(logs[1].stamina.before).toBe(71);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(9000);
    expect(logs[2].stamina.after).toBe(80);
    expect(logs[3].type).toBe('efficiencyBlock');
    expect(logs[3].timing).toBe(9000);
    expect(logs[3].stamina.before).toBe(80);
    expect(logs[3].stamina.after).toBe(80);
    expect(logs[4].type).toBe('efficiencyBlock');
    expect(logs[4].timing).toBe(21000);
    expect(logs[4].stamina.before).toBe(60);
    expect(logs[4].stamina.after).toBe(60);
    expect(logs[5].type).toBe('efficiencyBlock');
    expect(logs[5].timing).toBe(33000);
    expect(logs[5].stamina.before).toBe(40);
    expect(logs[5].stamina.after).toBe(40);
    expect(logs[6].type).toBe('efficiencyBlock');
    expect(logs[6].timing).toBe(45000);
    expect(logs[6].stamina.before).toBe(20);
    expect(logs[6].stamina.after).toBe(20);
    expect(logs[7].type).toBe('efficiencyBlock');
    expect(logs[7].timing).toBe(57000);
    expect(logs[7].stamina.before).toBe(0);
    expect(logs[7].stamina.after).toBe(0);
    expect(logs[8].type).toBe('sleep');
    expect(logs[8].timing).toBe(63000);
    expect(logs[8].stamina.before).toBe(0);
    expect(logs[9].type).toBe('endOfPeriod');
    expect(logs[9].timing).toBe(86400);
    expect(logs[9].stamina.before).toBe(0);
    expect(logs.length).toBe(10);
  });

  it('is correct without secondary sleep under optimistic', () => {
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
    logs = getLogsWithEndOfPeriodMark({logs});
    logs = getLogsWithEfficiencyBlock({logs});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(122);
    expect(logs[1].type).toBe('efficiencyBlock');
    expect(logs[1].timing).toBe(25200);
    expect(logs[1].stamina.before).toBe(80);
    expect(logs[1].stamina.after).toBe(80);
    expect(logs[2].type).toBe('efficiencyBlock');
    expect(logs[2].timing).toBe(37200);
    expect(logs[2].stamina.before).toBe(60);
    expect(logs[2].stamina.after).toBe(60);
    expect(logs[3].type).toBe('efficiencyBlock');
    expect(logs[3].timing).toBe(49200);
    expect(logs[3].stamina.before).toBe(40);
    expect(logs[3].stamina.after).toBe(40);
    expect(logs[4].type).toBe('sleep');
    expect(logs[4].timing).toBe(57600);
    expect(logs[4].stamina.before).toBe(26);
    expect(logs[4].stamina.after).toBe(26);
    expect(logs[5].type).toBe('efficiencyBlock');
    expect(logs[5].timing).toBe(61200);
    expect(logs[5].stamina.before).toBe(20);
    expect(logs[5].stamina.after).toBe(20);
    expect(logs[6].type).toBe('efficiencyBlock');
    expect(logs[6].timing).toBe(73200);
    expect(logs[6].stamina.before).toBe(0);
    expect(logs[6].stamina.after).toBe(0);
    expect(logs[7].type).toBe('endOfPeriod');
    expect(logs[7].timing).toBe(86400);
    expect(logs[7].stamina.before).toBe(0);
    expect(logs.length).toBe(8);
  });

  it('is correct when the sleep duration is short', () => {
    const sleepSessionInfo = getSleepSessionInfo({
      recoveryRate,
      sleepSession: {
        primary: {
          start: 82800, // 23:00
          end: 0, // 00:00
        },
        secondary: null,
      },
    });
    const general: StaminaGeneralRecoveryConfig = {
      strategy: 'conservative',
    };
    const skillTriggers: StaminaSkillTriggerData[] = [
      {dailyCount: 2, amount: 11},
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
    logs = getLogsWithEndOfPeriodMark({logs});
    logs = getLogsWithEfficiencyBlock({logs});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(12);
    expect(logs[1].type).toBe('efficiencyBlock');
    expect(logs[1].timing).toBe(7200);
    expect(logs[1].stamina.before).toBe(0);
    expect(logs[1].stamina.after).toBe(0);
    expect(logs[2].type).toBe('skillRecovery');
    expect(logs[2].timing).toBe(27600);
    expect(logs[2].stamina.before).toBe(0);
    expect(logs[2].stamina.after).toBe(11);
    expect(logs[3].type).toBe('efficiencyBlock');
    expect(logs[3].timing).toBe(34200);
    expect(logs[3].stamina.before).toBe(0);
    expect(logs[3].stamina.after).toBe(0);
    expect(logs[4].type).toBe('skillRecovery');
    expect(logs[4].timing).toBe(55200);
    expect(logs[4].stamina.before).toBe(0);
    expect(logs[4].stamina.after).toBe(11);
    expect(logs[5].type).toBe('efficiencyBlock');
    expect(logs[5].timing).toBe(61800);
    expect(logs[5].stamina.before).toBe(0);
    expect(logs[5].stamina.after).toBe(0);
    expect(logs[6].type).toBe('sleep');
    expect(logs[6].timing).toBe(82800);
    expect(logs[6].stamina.before).toBe(0);
    expect(logs[7].type).toBe('endOfPeriod');
    expect(logs[7].timing).toBe(86400);
    expect(logs[7].stamina.before).toBe(0);
    expect(logs.length).toBe(8);
  });

  it('is correct with > 1 recovery rate under conservative', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1.2,
      sleep: 1,
    };
    const sleepSessionInfo = getSleepSessionInfo({
      recoveryRate,
      sleepSession: {
        primary: {
          start: 84600, // 23:30
          end: 21600, // 06:00
        },
        secondary: {
          start: 46800, // 13:00
          end: 52200, // 14:30
        },
      },
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
    logs = getLogsWithSkillRecovery({sleepSessionInfo, general, skillTriggers, logs, recoveryRate});
    logs = getLogsWithEndOfPeriodMark({logs});
    logs = getLogsWithEfficiencyBlock({logs});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(93);
    expect(logs[1].type).toBe('efficiencyBlock');
    expect(logs[1].timing).toBe(7800);
    expect(logs[1].stamina.before).toBe(80);
    expect(logs[1].stamina.after).toBe(80);
    expect(logs[2].type).toBe('skillRecovery');
    expect(logs[2].timing).toBe(14400);
    expect(logs[2].stamina.before).toBe(69);
    expect(logs[2].stamina.after).toBe(80);
    expect(logs[3].type).toBe('efficiencyBlock');
    expect(logs[3].timing).toBe(14400);
    expect(logs[3].stamina.before).toBe(80);
    expect(logs[3].stamina.after).toBe(80);
    expect(logs[4].type).toBe('sleep');
    expect(logs[4].timing).toBe(25200);
    expect(logs[4].stamina.before).toBe(62);
    expect(logs[4].stamina.after).toBe(62);
    expect(logs[5].type).toBe('efficiencyBlock');
    expect(logs[5].timing).toBe(26400);
    expect(logs[5].stamina.before).toBe(60);
    expect(logs[5].stamina.after).toBe(60);
    expect(logs[6].type).toBe('wakeup');
    expect(logs[6].timing).toBe(30600);
    expect(logs[6].stamina.before).toBe(53);
    expect(logs[6].stamina.after).toBe(75);
    expect(logs[7].type).toBe('skillRecovery');
    expect(logs[7].timing).toBe(34200);
    expect(logs[7].stamina.before).toBe(69);
    expect(logs[7].stamina.after).toBe(80);
    expect(logs[8].type).toBe('efficiencyBlock');
    expect(logs[8].timing).toBe(34200);
    expect(logs[8].stamina.before).toBe(80);
    expect(logs[8].stamina.after).toBe(80);
    expect(logs[9].type).toBe('efficiencyBlock');
    expect(logs[9].timing).toBe(46200);
    expect(logs[9].stamina.before).toBe(60);
    expect(logs[9].stamina.after).toBe(60);
    expect(logs[10].type).toBe('skillRecovery');
    expect(logs[10].timing).toBe(48600);
    expect(logs[10].stamina.before).toBe(56);
    expect(logs[10].stamina.after).toBe(67);
    expect(logs[11].type).toBe('efficiencyBlock');
    expect(logs[11].timing).toBe(52800);
    expect(logs[11].stamina.before).toBe(60);
    expect(logs[11].stamina.after).toBe(60);
    expect(logs[12].type).toBe('sleep');
    expect(logs[12].timing).toBe(63000);
    expect(logs[12].stamina.before).toBe(43);
    expect(logs[12].stamina.after).toBe(43);
    expect(logs[13].type).toBe('efficiencyBlock');
    expect(logs[13].timing).toBe(64800);
    expect(logs[13].stamina.before).toBe(40);
    expect(logs[13].stamina.after).toBe(40);
    expect(logs[14].type).toBe('efficiencyBlock');
    expect(logs[14].timing).toBe(76800);
    expect(logs[14].stamina.before).toBe(20);
    expect(logs[14].stamina.after).toBe(20);
    expect(logs[15].type).toBe('endOfPeriod');
    expect(logs[15].timing).toBe(86400);
    expect(logs[15].stamina.before).toBe(4);
    expect(logs.length).toBe(16);
  });
});
