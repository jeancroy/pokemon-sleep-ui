import {describe, expect, it} from '@jest/globals';

import {StaminaRecoveryRateConfig} from '@/types/game/stamina/config';
import {StaminaSkillRecoveryConfig, StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {getSleepSessionInfo} from '@/utils/game/sleep';
import {getLogsWithEndOfPeriodMark} from '@/utils/game/stamina/events/endOfPeriod';
import {getLogsWithPrimarySleep} from '@/utils/game/stamina/events/primary';
import {getLogsWithSecondarySleep} from '@/utils/game/stamina/events/secondary';
import {getLogsWithSkillRecovery} from '@/utils/game/stamina/events/skill';


describe('Stamina / Event Log (+End of Period)', () => {
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
      {dailyCount: 1, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});
    logs = getLogsWithSkillRecovery({sessionInfo, skillRecovery, skillTriggers, logs, recoveryRate});
    logs = getLogsWithEndOfPeriodMark({logs});

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
    expect(logs[3].timing).toBe(34200);
    expect(logs[3].stamina.before).toBe(61);
    expect(logs[3].stamina.after).toBe(70);
    expect(logs[4].type).toBe('sleep');
    expect(logs[4].timing).toBe(63000);
    expect(logs[4].stamina.before).toBe(22);
    expect(logs[5].type).toBe('endOfPeriod');
    expect(logs[5].timing).toBe(86400);
    expect(logs[5].stamina.before).toBe(0);
    expect(logs.length).toBe(6);
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
    logs = getLogsWithEndOfPeriodMark({logs});

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
    expect(logs[7].type).toBe('endOfPeriod');
    expect(logs[7].timing).toBe(86400);
    expect(logs[7].stamina.before).toBe(1);
    expect(logs.length).toBe(8);
  });

  it('is correct with secondary sleep without any skill trigger', () => {
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
      {dailyCount: 0, amount: 9},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});
    logs = getLogsWithSkillRecovery({sessionInfo, skillRecovery, skillTriggers, logs, recoveryRate});
    logs = getLogsWithEndOfPeriodMark({logs});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(100);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(3600);
    expect(logs[1].stamina.before).toBe(94);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(9000);
    expect(logs[2].stamina.after).toBe(103);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(63000);
    expect(logs[3].stamina.before).toBe(13);
    expect(logs[4].type).toBe('endOfPeriod');
    expect(logs[4].timing).toBe(86400);
    expect(logs[4].stamina.before).toBe(0);
    expect(logs.length).toBe(5);
  });

  it('is correct without secondary sleep under optimistic', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1,
      sleep: 1,
    };
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 84600, // 23:30
        end: 27000, // 07:30
      },
      secondary: null,
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
    logs = getLogsWithEndOfPeriodMark({logs});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(127);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(57600);
    expect(logs[1].stamina.before).toBe(31);
    expect(logs[2].type).toBe('endOfPeriod');
    expect(logs[2].timing).toBe(86400);
    expect(logs[2].stamina.before).toBe(0);
    expect(logs.length).toBe(3);
  });

  it('is correct when the sleep duration is short', () => {
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
      {dailyCount: 2, amount: 11},
    ];

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery, skillTriggers, recoveryRate});
    logs = getLogsWithSecondarySleep({sessionInfo, logs, recoveryRate});
    logs = getLogsWithSkillRecovery({sessionInfo, skillRecovery, skillTriggers, logs, recoveryRate});
    logs = getLogsWithEndOfPeriodMark({logs});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(84);
    expect(logs[1].type).toBe('skillRecovery');
    expect(logs[1].timing).toBe(27600);
    expect(logs[1].stamina.before).toBe(38);
    expect(logs[1].stamina.after).toBe(49);
    expect(logs[2].type).toBe('skillRecovery');
    expect(logs[2].timing).toBe(55200);
    expect(logs[2].stamina.before).toBe(3);
    expect(logs[2].stamina.after).toBe(14);
    expect(logs[3].type).toBe('sleep');
    expect(logs[3].timing).toBe(82800);
    expect(logs[3].stamina.before).toBe(0);
    expect(logs[4].type).toBe('endOfPeriod');
    expect(logs[4].timing).toBe(86400);
    expect(logs[4].stamina.before).toBe(0);
    expect(logs.length).toBe(5);
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
    logs = getLogsWithEndOfPeriodMark({logs});

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
    expect(logs[7].type).toBe('endOfPeriod');
    expect(logs[7].timing).toBe(86400);
    expect(logs[7].stamina.before).toBe(11);
    expect(logs.length).toBe(8);
  });
});
