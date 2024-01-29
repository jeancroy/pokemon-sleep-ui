import {durationOfDay} from '@/const/common';
import {maxSleepEffectiveDuration, staminaMaxRecovery, staminaRecoveryInterval} from '@/const/game/stamina';
import {SleepSessionInfo, SleepSessionMeta, SleepSessionRecovery, SleepSessionTimes} from '@/types/game/sleep';
import {StaminaSleepSessionConfig} from '@/types/game/stamina/config';
import {StaminaRecoveryRateConfig} from '@/types/game/stamina/recovery';
import {getActualRecoveryAmount} from '@/utils/game/stamina/events/utils';
import {rotateTime} from '@/utils/time';


const getSleepSessionActualDuration = ({start, end}: SleepSessionTimes): number => {
  return end - start + (end > start ? 0 : durationOfDay);
};

type GetPrimarySleepSessionRecoveryOpts = {
  session: SleepSessionTimes,
  recoveryRate: StaminaRecoveryRateConfig,
};

const getPrimarySleepSessionRecovery = ({
  session,
  recoveryRate,
}: GetPrimarySleepSessionRecoveryOpts): SleepSessionRecovery => {
  const actualDuration = getSleepSessionActualDuration(session);
  const effectiveDuration = Math.min(actualDuration, maxSleepEffectiveDuration);

  const recoveryBase = Math.ceil(Math.min(
    Math.min(actualDuration, maxSleepEffectiveDuration) / staminaRecoveryInterval,
    staminaMaxRecovery,
  ));

  return {
    duration: {
      actual: actualDuration,
      effective: effectiveDuration,
    },
    recovery: {
      base: recoveryBase,
      actual: getActualRecoveryAmount({
        amount: recoveryBase,
        recoveryRate,
        isSleep: true,
      }),
    },
  };
};

type GetSecondarySleepSessionMetaOpts = {
  sleepSession: StaminaSleepSessionConfig,
  recoveryRate: StaminaRecoveryRateConfig,
  primaryMeta: SleepSessionMeta,
};

const getSecondarySleepSessionMeta = ({
  sleepSession,
  recoveryRate,
  primaryMeta,
}: GetSecondarySleepSessionMetaOpts): SleepSessionMeta | null => {
  const {primary, secondary} = sleepSession;
  if (!secondary) {
    return null;
  }

  const actualDuration = getSleepSessionActualDuration(secondary);
  const effectiveDuration = Math.min(
    maxSleepEffectiveDuration - primaryMeta.duration.effective,
    actualDuration,
  );
  const start = rotateTime(secondary.start - primary.end);
  const recoveryBase = Math.ceil(Math.min(
    effectiveDuration / staminaRecoveryInterval,
    // Base recovery available left after primary
    Math.max(staminaMaxRecovery - primaryMeta.recovery.base, 0),
  ));

  return {
    duration: {
      actual: actualDuration,
      effective: effectiveDuration,
    },
    recovery: {
      base: recoveryBase,
      actual: getActualRecoveryAmount({
        amount: recoveryBase,
        recoveryRate,
        isSleep: true,
      }),
    },
    adjustedTiming: {
      start,
      end: start + actualDuration,
    },
  };
};

type GetSleepSessionInfoOpts = {
  sleepSession: StaminaSleepSessionConfig,
  recoveryRate: StaminaRecoveryRateConfig,
};

export const getSleepSessionInfo = ({sleepSession, recoveryRate}: GetSleepSessionInfoOpts): SleepSessionInfo => {
  const {primary} = sleepSession;

  const primaryMeta: SleepSessionMeta = {
    ...getPrimarySleepSessionRecovery({
      session: primary,
      recoveryRate,
    }),
    adjustedTiming: {
      start: rotateTime(primary.start - primary.end),
      end: 0,
    },
  };
  const secondaryMeta = getSecondarySleepSessionMeta({
    sleepSession,
    recoveryRate,
    primaryMeta,
  });

  const asleepDuration = primaryMeta.duration.actual + (secondaryMeta?.duration.actual ?? 0);
  const awakeDuration = durationOfDay - asleepDuration;

  return {
    session: {
      primary: primaryMeta,
      secondary: secondaryMeta,
    },
    offset: -primary.end,
    duration: {
      asleep: asleepDuration,
      awake: awakeDuration,
    },
  };
};
