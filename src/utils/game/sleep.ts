import {durationOfDay} from '@/const/common';
import {maxSleepEffectiveDuration, staminaMaxRecovery, staminaRecoveryInterval} from '@/const/game/stamina';
import {
  SleepDurationInfo,
  SleepSessionInfo,
  SleepSessionMeta,
  SleepSessionRecovery,
  SleepSessionTimes,
} from '@/types/game/sleep';
import {StaminaRecoveryRateConfig, StaminaSleepSessionConfig} from '@/types/game/stamina/config';
import {toSum} from '@/utils/array';
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

  return {
    duration: {
      actual: actualDuration,
      effective: effectiveDuration,
    },
    recovery: Math.min(
      staminaMaxRecovery,
      getActualRecoveryAmount({
        amount: Math.min(actualDuration, maxSleepEffectiveDuration) / staminaRecoveryInterval,
        recoveryRate,
        isSleep: true,
      }),
    ),
  };
};

type GetSecondarySleepSessionMetaOpts = {
  session: StaminaSleepSessionConfig,
  recoveryRate: StaminaRecoveryRateConfig,
  primaryMeta: SleepSessionMeta,
};

const getSecondarySleepSessionMeta = ({
  session,
  recoveryRate,
  primaryMeta,
}: GetSecondarySleepSessionMetaOpts): SleepSessionMeta | null => {
  const {primary, secondary} = session;
  if (!secondary) {
    return null;
  }

  const actualDuration = getSleepSessionActualDuration(secondary);
  const effectiveDuration = Math.min(
    maxSleepEffectiveDuration - primaryMeta.duration.effective,
    actualDuration,
  );
  const start = rotateTime(secondary.start - primary.end);
  const recoveryAvailableLeft = Math.max(staminaMaxRecovery - primaryMeta.recovery, 0);

  return {
    duration: {
      actual: actualDuration,
      effective: effectiveDuration,
    },
    recovery: Math.min(
      recoveryAvailableLeft,
      getActualRecoveryAmount({
        amount: effectiveDuration / staminaRecoveryInterval,
        recoveryRate,
        isSleep: true,
      }),
    ),
    adjustedTiming: {
      start,
      end: start + actualDuration,
    },
  };
};

type GetSleepSessionInfoOpts = {
  session: StaminaSleepSessionConfig,
  recoveryRate: StaminaRecoveryRateConfig,
};

export const getSleepSessionInfo = ({session, recoveryRate}: GetSleepSessionInfoOpts): SleepSessionInfo => {
  const {primary} = session;

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
    session,
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
    duration: {
      asleep: asleepDuration,
      awake: awakeDuration,
    },
  };
};

export const getSleepDurationInfo = ({
  primary,
  secondary,
}: StaminaSleepSessionConfig): SleepDurationInfo => {
  const durations = [rotateTime(primary.end - primary.start)];

  if (secondary) {
    durations.push(rotateTime(secondary.end - secondary.start));
  }

  return {durations, total: toSum(durations)};
};
