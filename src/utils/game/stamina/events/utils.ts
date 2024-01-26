import {StaminaRecoveryRateConfig} from '@/types/game/stamina/config';
import {StaminaEventLog} from '@/types/game/stamina/event';
import {getStaminaAfterDuration} from '@/utils/game/stamina/depletion';


type UpdateLogStaminaFromLastOpts = {
  source: StaminaEventLog,
  last: StaminaEventLog,
};

export const updateLogStaminaFromLast = ({source, last}: UpdateLogStaminaFromLastOpts): StaminaEventLog => {
  const duration = source.timing - last.timing;

  const stamina = getStaminaAfterDuration({
    start: last.stamina.after,
    duration,
  });
  const staminaUnderlying = getStaminaAfterDuration({
    start: last.staminaUnderlying.after,
    duration,
  });

  return {
    ...source,
    stamina: {
      before: stamina.inGame,
      after: stamina.inGame + (source.stamina.after - source.stamina.before),
    },
    staminaUnderlying: {
      before: staminaUnderlying.actual,
      after: staminaUnderlying.actual + (source.staminaUnderlying.after - source.staminaUnderlying.before),
    },
  };
};

type GenerateSleepEventFromLastOpts = {
  newLogs: StaminaEventLog[],
  sleepLog: StaminaEventLog,
};

export const generateSleepEventFromLast = ({newLogs, sleepLog}: GenerateSleepEventFromLastOpts): StaminaEventLog => {
  const last = newLogs[newLogs.length - 1];

  return updateLogStaminaFromLast({source: sleepLog, last});
};

type OffsetEventLogStaminaOpts = {
  log: StaminaEventLog,
  offset: number,
};

export const offsetEventLogStamina = ({log, offset}: OffsetEventLogStaminaOpts): StaminaEventLog => {
  const {stamina, staminaUnderlying} = log;

  return {
    ...log,
    stamina: {
      before: Math.max(stamina.before, staminaUnderlying.before + offset),
      after: Math.max(stamina.after - stamina.before, staminaUnderlying.after + offset),
    },
    staminaUnderlying: {
      before: staminaUnderlying.before + offset,
      after: staminaUnderlying.after + offset,
    },
  };
};

type GetFinalRecoveryRateOpts = {
  recoveryRate: StaminaRecoveryRateConfig,
  isSleep: boolean,
};

export const getFinalRecoveryRate = ({recoveryRate, isSleep}: GetFinalRecoveryRateOpts) => {
  const {general, sleep} = recoveryRate;

  return general * (isSleep ? sleep : 1);
};

type GetActualRecoveryAmountOpts = GetFinalRecoveryRateOpts & {
  amount: number,
};

export const getActualRecoveryAmount = ({amount, ...opts}: GetActualRecoveryAmountOpts) => {
  return Math.ceil(amount * getFinalRecoveryRate(opts));
};
