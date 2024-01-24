import {describe, expect, it} from '@jest/globals';

import {StaminaEventLog} from '@/types/game/stamina/event';
import {getStaminaEventLogsFlattened} from '@/utils/game/stamina/flatten';


describe('Stamina / Event Log Flattening', () => {
  const originalLogs: StaminaEventLog[] = [
    {
      type: 'wakeup',
      timing: 0,
      stamina: {before: 4, after: 100},
      staminaUnderlying: {before: 4, after: 100},
    },
    {
      type: 'efficiencyBlock',
      timing: 12000,
      stamina: {before: 80, after: 80},
      staminaUnderlying: {before: 80, after: 80},
    },
    {
      type: 'skillRecovery',
      timing: 19200,
      stamina: {before: 68, after: 86},
      staminaUnderlying: {before: 68, after: 86},
    },
    {
      type: 'efficiencyBlock',
      timing: 22800,
      stamina: {before: 80, after: 80},
      staminaUnderlying: {before: 80, after: 80},
    },
    {
      type: 'sleep',
      timing: 34200,
      stamina: {before: 61, after: 61},
      staminaUnderlying: {before: 61, after: 61},
    },
    {
      type: 'efficiencyBlock',
      timing: 34800,
      stamina: {before: 60, after: 60},
      staminaUnderlying: {before: 60, after: 60},
    },
    {
      type: 'wakeup',
      timing: 39600,
      stamina: {before: 52, after: 70},
      staminaUnderlying: {before: 52, after: 70},
    },
    {
      type: 'efficiencyBlock',
      timing: 45600,
      stamina: {before: 60, after: 60},
      staminaUnderlying: {before: 60, after: 60},
    },
    {
      type: 'efficiencyBlock',
      timing: 57600,
      stamina: {before: 40, after: 40},
      staminaUnderlying: {before: 40, after: 40},
    },
    {
      type: 'sleep',
      timing: 60000,
      stamina: {before: 36, after: 36},
      staminaUnderlying: {before: 36, after: 36},
    },
    {
      type: 'efficiencyBlock',
      timing: 69600,
      stamina: {before: 20, after: 20},
      staminaUnderlying: {before: 20, after: 20},
    },
    {
      type: 'efficiencyBlock',
      timing: 81600,
      stamina: {before: 0, after: 0},
      staminaUnderlying: {before: 0, after: 0},
    },
    {
      type: 'endOfPeriod',
      timing: 86400,
      stamina: {before: 0, after: 0},
      staminaUnderlying: {before: 0, after: 0},
    },
  ];

  it('is correct', () => {
    const logs = getStaminaEventLogsFlattened(originalLogs);

    expect(logs[0].type).toBe('wakeup');
    expect(logs[0].timing).toBe(0);
    expect(logs[0].stamina).toBe(100);
    expect(logs[1].type).toBe(null);
    expect(logs[1].timing).toBe(600);
    expect(logs[1].stamina).toBe(99);
    expect(logs[2].type).toBe(null);
    expect(logs[2].timing).toBe(1200);
    expect(logs[2].stamina).toBe(98);
    expect(logs[20].type).toBe('efficiencyBlock');
    expect(logs[20].timing).toBe(12000);
    expect(logs[20].stamina).toBe(80);
    expect(logs[32].type).toBe('skillRecovery');
    expect(logs[32].timing).toBe(19200);
    expect(logs[32].stamina).toBe(68);
    expect(logs[33].type).toBe('skillRecovery');
    expect(logs[33].timing).toBe(19200);
    expect(logs[33].stamina).toBe(86);
    expect(logs[34].type).toBe(null);
    expect(logs[34].timing).toBe(19800);
    expect(logs[34].stamina).toBe(85);
    expect(logs[58].type).toBe('sleep');
    expect(logs[58].timing).toBe(34200);
    expect(logs[58].stamina).toBe(61);
    expect(logs[59].type).toBe('efficiencyBlock');
    expect(logs[59].timing).toBe(34800);
    expect(logs[59].stamina).toBe(60);
    expect(logs[60].type).toBe('sleep');
    expect(logs[60].timing).toBe(35400);
    expect(logs[60].stamina).toBe(59);
    expect(logs[67].type).toBe('wakeup');
    expect(logs[67].timing).toBe(39600);
    expect(logs[67].stamina).toBe(52);
    expect(logs[68].type).toBe('wakeup');
    expect(logs[68].timing).toBe(39600);
    expect(logs[68].stamina).toBe(70);
    expect(logs[78].type).toBe('efficiencyBlock');
    expect(logs[78].timing).toBe(45600);
    expect(logs[78].stamina).toBe(60);
  });

  it('is sorted by timing', () => {
    const logs = getStaminaEventLogsFlattened(originalLogs);

    const timingDiff = [...new Array(logs.length - 1).keys()]
      .map((idx) => logs[idx + 1].timing - logs[idx].timing);

    expect(timingDiff.some((diff) => diff < 0)).toBeFalsy();
  });
});
