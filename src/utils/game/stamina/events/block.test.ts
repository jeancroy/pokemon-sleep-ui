import {describe, expect, it} from '@jest/globals';

import {StaminaCalcSkillRecoveryConfig} from '@/types/game/producing/stamina';
import {getSleepSessionInfo} from '@/utils/game/sleep';
import {getLogsWithEfficiencyBlock} from '@/utils/game/stamina/events/block';
import {getLogsWithPrimarySleep} from '@/utils/game/stamina/events/primary';
import {getLogsWithSecondarySleep} from '@/utils/game/stamina/events/secondary';
import {getLogsWithSkillRecovery} from '@/utils/game/stamina/events/skill';


describe('Stamina Event Log (+Efficiency Block)', () => {
  it('is correct with secondary sleep before any skill trigger under conservative', () => {
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

    const skillRecovery: StaminaCalcSkillRecoveryConfig = {
      strategy: 'conservative',
      dailyCount: 1,
      amount: 9,
    };

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery});
    logs = getLogsWithSecondarySleep({sessionInfo, logs});
    logs = getLogsWithSkillRecovery({sessionInfo, skillRecovery, logs});
    logs = getLogsWithEfficiencyBlock({logs});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(100);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(3600);
    expect(logs[1].stamina.before).toBe(94);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(9000);
    expect(logs[2].stamina.after).toBe(100);
    expect(logs[3].type).toBe('efficiencyBlock');
    expect(logs[3].timing).toBe(21000);
    expect(logs[3].stamina.before).toBe(80);
    expect(logs[3].stamina.after).toBe(80);
    expect(logs[4].type).toBe('efficiencyBlock');
    expect(logs[4].timing).toBe(33000);
    expect(logs[4].stamina.before).toBe(60);
    expect(logs[4].stamina.after).toBe(60);
    expect(logs[5].type).toBe('skillRecovery');
    expect(logs[5].timing).toBe(34200);
    expect(logs[5].stamina.before).toBe(58);
    expect(logs[5].stamina.after).toBe(67);
    expect(logs[6].type).toBe('efficiencyBlock');
    expect(logs[6].timing).toBe(38400);
    expect(logs[6].stamina.before).toBe(60);
    expect(logs[6].stamina.after).toBe(60);
    expect(logs[7].type).toBe('efficiencyBlock');
    expect(logs[7].timing).toBe(50400);
    expect(logs[7].stamina.before).toBe(40);
    expect(logs[7].stamina.after).toBe(40);
    expect(logs[8].type).toBe('efficiencyBlock');
    expect(logs[8].timing).toBe(62400);
    expect(logs[8].stamina.before).toBe(20);
    expect(logs[8].stamina.after).toBe(20);
    expect(logs[9].type).toBe('sleep');
    expect(logs[9].timing).toBe(63000);
    expect(logs[9].stamina.before).toBe(19);
    expect(logs.length).toBe(10);
  });

  it('is correct with secondary sleep after a skill trigger under conservative', () => {
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

    const skillRecovery: StaminaCalcSkillRecoveryConfig = {
      strategy: 'conservative',
      dailyCount: 3,
      amount: 9,
    };

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery});
    logs = getLogsWithSecondarySleep({sessionInfo, logs});
    logs = getLogsWithSkillRecovery({sessionInfo, skillRecovery, logs});
    logs = getLogsWithEfficiencyBlock({logs});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(100);
    expect(logs[1].type).toBe('efficiencyBlock');
    expect(logs[1].timing).toBe(12000);
    expect(logs[1].stamina.before).toBe(80);
    expect(logs[1].stamina.after).toBe(80);
    expect(logs[2].type).toBe('skillRecovery');
    expect(logs[2].timing).toBe(14400);
    expect(logs[2].stamina.before).toBe(76);
    expect(logs[2].stamina.after).toBe(85);
    expect(logs[3].type).toBe('efficiencyBlock');
    expect(logs[3].timing).toBe(17400);
    expect(logs[3].stamina.before).toBe(80);
    expect(logs[3].stamina.after).toBe(80);
    expect(logs[4].type).toBe('sleep');
    expect(logs[4].timing).toBe(25200);
    expect(logs[4].stamina.before).toBe(67);
    expect(logs[5].type).toBe('wakeup');
    expect(logs[5].timing).toBe(30600);
    expect(logs[5].stamina.after).toBe(85);
    expect(logs[6].type).toBe('efficiencyBlock');
    expect(logs[6].timing).toBe(33600);
    expect(logs[6].stamina.before).toBe(80);
    expect(logs[6].stamina.after).toBe(80);
    expect(logs[7].type).toBe('skillRecovery');
    expect(logs[7].timing).toBe(34200);
    expect(logs[7].stamina.before).toBe(79);
    expect(logs[7].stamina.after).toBe(88);
    expect(logs[8].type).toBe('efficiencyBlock');
    expect(logs[8].timing).toBe(39000);
    expect(logs[8].stamina.before).toBe(80);
    expect(logs[8].stamina.after).toBe(80);
    expect(logs[9].type).toBe('skillRecovery');
    expect(logs[9].timing).toBe(48600);
    expect(logs[9].stamina.before).toBe(64);
    expect(logs[9].stamina.after).toBe(73);
    expect(logs[10].type).toBe('efficiencyBlock');
    expect(logs[10].timing).toBe(56400);
    expect(logs[10].stamina.before).toBe(60);
    expect(logs[10].stamina.after).toBe(60);
    expect(logs[11].type).toBe('sleep');
    expect(logs[11].timing).toBe(63000);
    expect(logs[11].stamina.before).toBe(49);
    expect(logs.length).toBe(12);
  });

  it('is correct with secondary sleep without any skill trigger', () => {
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

    const skillRecovery: StaminaCalcSkillRecoveryConfig = {
      strategy: 'conservative',
      dailyCount: 0,
      amount: 9,
    };

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery});
    logs = getLogsWithSecondarySleep({sessionInfo, logs});
    logs = getLogsWithSkillRecovery({sessionInfo, skillRecovery, logs});
    logs = getLogsWithEfficiencyBlock({logs});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(100);
    expect(logs[1].type).toBe('sleep');
    expect(logs[1].timing).toBe(3600);
    expect(logs[1].stamina.before).toBe(94);
    expect(logs[2].type).toBe('wakeup');
    expect(logs[2].timing).toBe(9000);
    expect(logs[2].stamina.after).toBe(100);
    expect(logs[3].type).toBe('efficiencyBlock');
    expect(logs[3].timing).toBe(21000);
    expect(logs[3].stamina.before).toBe(80);
    expect(logs[3].stamina.after).toBe(80);
    expect(logs[4].type).toBe('efficiencyBlock');
    expect(logs[4].timing).toBe(33000);
    expect(logs[4].stamina.before).toBe(60);
    expect(logs[4].stamina.after).toBe(60);
    expect(logs[5].type).toBe('efficiencyBlock');
    expect(logs[5].timing).toBe(45000);
    expect(logs[5].stamina.before).toBe(40);
    expect(logs[5].stamina.after).toBe(40);
    expect(logs[6].type).toBe('efficiencyBlock');
    expect(logs[6].timing).toBe(57000);
    expect(logs[6].stamina.before).toBe(20);
    expect(logs[6].stamina.after).toBe(20);
    expect(logs[7].type).toBe('sleep');
    expect(logs[7].timing).toBe(63000);
    expect(logs[7].stamina.before).toBe(10);
    expect(logs.length).toBe(8);
  });

  it('is correct with secondary sleep under optimistic strategy', () => {
    const sessionInfo = getSleepSessionInfo({
      primary: {
        start: 84600, // 23:30
        end: 27000, // 07:30
      },
      secondary: null,
    });

    const skillRecovery: StaminaCalcSkillRecoveryConfig = {
      strategy: 'optimistic',
      dailyCount: 3,
      amount: 9,
    };

    let logs = getLogsWithPrimarySleep({sessionInfo, skillRecovery});
    logs = getLogsWithSecondarySleep({sessionInfo, logs});
    logs = getLogsWithSkillRecovery({sessionInfo, skillRecovery, logs});
    logs = getLogsWithEfficiencyBlock({logs});

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina.after).toBe(127);
    expect(logs[1].type).toBe('efficiencyBlock');
    expect(logs[1].timing).toBe(28200);
    expect(logs[1].stamina.before).toBe(80);
    expect(logs[1].stamina.after).toBe(80);
    expect(logs[2].type).toBe('efficiencyBlock');
    expect(logs[2].timing).toBe(40200);
    expect(logs[2].stamina.before).toBe(60);
    expect(logs[2].stamina.after).toBe(60);
    expect(logs[3].type).toBe('efficiencyBlock');
    expect(logs[3].timing).toBe(52200);
    expect(logs[3].stamina.before).toBe(40);
    expect(logs[3].stamina.after).toBe(40);
    expect(logs[4].type).toBe('sleep');
    expect(logs[4].timing).toBe(57600);
    expect(logs[4].stamina.before).toBe(31);
    expect(logs.length).toBe(5);
  });
});