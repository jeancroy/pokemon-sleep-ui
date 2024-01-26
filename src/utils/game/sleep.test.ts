import {describe, expect, it} from '@jest/globals';

import {StaminaRecoveryRateConfig} from '@/types/game/stamina/config';
import {getSleepSessionInfo} from '@/utils/game/sleep';


describe('Sleep Session Info', () => {
  const recoveryRate: StaminaRecoveryRateConfig = {
    general: 1,
    sleep: 1,
  };

  it('is correct for overnight primary with secondary', () => {
    const {session, duration} = getSleepSessionInfo({
      recoveryRate,
      session: {
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

    expect(session.primary.adjustedTiming.start).toBe(63000);
    expect(session.primary.adjustedTiming.end).toBe(0);
    expect(session.primary.duration.actual).toBe(23400);
    expect(session.primary.duration.effective).toBe(23400);
    expect(session.secondary?.adjustedTiming.start).toBe(25200);
    expect(session.secondary?.adjustedTiming.end).toBe(30600);
    expect(session.secondary?.duration.actual).toBe(5400);
    expect(session.secondary?.duration.effective).toBe(5400);
    expect(duration.awake).toBe(57600);
  });

  it('is correct for overnight primary without secondary', () => {
    const {session, duration} = getSleepSessionInfo({
      recoveryRate,
      session: {
        primary: {
          start: 84600, // 23:30
          end: 21600, // 06:00
        },
        secondary: null,
      },
    });

    expect(session.primary.adjustedTiming.start).toBe(63000);
    expect(session.primary.adjustedTiming.end).toBe(0);
    expect(session.primary.duration.actual).toBe(23400);
    expect(session.primary.duration.effective).toBe(23400);
    expect(session.secondary).toBeNull();
    expect(duration.awake).toBe(63000);
  });

  it('is correct for same-day primary with secondary', () => {
    const {session, duration} = getSleepSessionInfo({
      recoveryRate,
      session: {
        primary: {
          start: 21600, // 06:00
          end: 46800, // 13:00
        },
        secondary: {
          start: 61200, // 17:00
          end: 66600, // 18:30
        },
      },
    });

    expect(session.primary.adjustedTiming.start).toBe(61200);
    expect(session.primary.adjustedTiming.end).toBe(0);
    expect(session.primary.duration.actual).toBe(25200);
    expect(session.primary.duration.effective).toBe(25200);
    expect(session.secondary?.adjustedTiming.start).toBe(14400);
    expect(session.secondary?.adjustedTiming.end).toBe(19800);
    expect(session.secondary?.duration.actual).toBe(5400);
    expect(session.secondary?.duration.effective).toBe(5400);
    expect(duration.awake).toBe(55800);
  });

  it('is correct for same-day primary without secondary', () => {
    const {session, duration} = getSleepSessionInfo({
      recoveryRate,
      session: {
        primary: {
          start: 21600, // 06:00
          end: 46800, // 13:00
        },
        secondary: null,
      },
    });

    expect(session.primary.adjustedTiming.start).toBe(61200);
    expect(session.primary.adjustedTiming.end).toBe(0);
    expect(session.primary.duration.actual).toBe(25200);
    expect(session.primary.duration.effective).toBe(25200);
    expect(session.secondary).toBeNull();
    expect(duration.awake).toBe(61200);
  });

  it('has correct recovery when total sleep time < 8.5h', () => {
    const {session} = getSleepSessionInfo({
      recoveryRate,
      session: {
        primary: {
          start: 0, // 00:00
          end: 3600 * 4.25, // 04:15
        },
        secondary: {
          start: 3600 * 5.25, // 05:15
          end: 3600 * 9, // 09:00
        },
      },
    });

    expect(session.primary.recovery.base).toBe(50);
    expect(session.primary.recovery.actual).toBe(50);
    expect(session.secondary?.recovery.base).toBe(45);
    expect(session.secondary?.recovery.actual).toBe(45);
  });

  it('has correct recovery for total sleep time = 8.5h', () => {
    const {session} = getSleepSessionInfo({
      recoveryRate,
      session: {
        primary: {
          start: 0, // 00:00
          end: 3600 * 4.25, // 04:15
        },
        secondary: {
          start: 3600 * 5.25, // 05:15
          end: 3600 * 9.5, // 09:30
        },
      },
    });

    expect(session.primary.recovery.base).toBe(50);
    expect(session.primary.recovery.actual).toBe(50);
    expect(session.secondary?.recovery.base).toBe(50);
    expect(session.secondary?.recovery.actual).toBe(50);
  });

  it('has correct info with > 8.5h sleep', () => {
    const {session} = getSleepSessionInfo({
      recoveryRate,
      session: {
        primary: {
          start: 0, // 00:00
          end: 3600 * 7, // 07:00
        },
        secondary: {
          start: 3600 * 8, // 08:00
          end: 3600 * 12, // 12:00
        },
      },
    });

    expect(session.primary.recovery.base).toBe(83);
    expect(session.primary.recovery.actual).toBe(83);
    expect(session.primary.adjustedTiming.start).toBe(61200);
    expect(session.primary.adjustedTiming.end).toBe(0);
    expect(session.primary.duration.actual).toBe(25200);
    expect(session.primary.duration.effective).toBe(25200);
    expect(session.secondary?.recovery.base).toBe(17);
    expect(session.secondary?.recovery.actual).toBe(17);
    expect(session.secondary?.adjustedTiming.start).toBe(3600);
    expect(session.secondary?.adjustedTiming.end).toBe(18000);
    expect(session.secondary?.duration.actual).toBe(14400);
    expect(session.secondary?.duration.effective).toBe(5400);
  });

  it('allows actual total recovery go beyond 100 with recovery rate up', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1,
      sleep: 1.2,
    };

    const {session} = getSleepSessionInfo({
      recoveryRate,
      session: {
        primary: {
          start: 0, // 00:00
          end: 3600 * 7, // 07:00
        },
        secondary: {
          start: 3600 * 8, // 08:00
          end: 3600 * 12, // 12:00
        },
      },
    });

    expect(session.primary.recovery.base).toBe(83);
    expect(session.primary.recovery.actual).toBe(100);
    expect(session.secondary?.recovery.base).toBe(17);
    expect(session.secondary?.recovery.actual).toBe(21);
  });

  it('has valid total recovery with recovery rate down', () => {
    const recoveryRate: StaminaRecoveryRateConfig = {
      general: 1,
      sleep: 0.8,
    };

    const {session} = getSleepSessionInfo({
      recoveryRate,
      session: {
        primary: {
          start: 0, // 00:00
          end: 3600 * 7, // 07:00
        },
        secondary: {
          start: 3600 * 8, // 08:00
          end: 3600 * 12, // 12:00
        },
      },
    });

    expect(session.primary.recovery.base).toBe(83);
    expect(session.primary.recovery.actual).toBe(67);
    expect(session.secondary?.recovery.base).toBe(17);
    expect(session.secondary?.recovery.actual).toBe(14);
  });
});
