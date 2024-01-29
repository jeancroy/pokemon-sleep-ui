import {staminaAbsoluteMax} from '@/const/game/stamina';
import {StaminaEventLog, StaminaEventType} from '@/types/game/stamina/event';
import {StaminaRecovery, StaminaRecoveryRateConfig} from '@/types/game/stamina/recovery';
import {getStaminaAfterDuration} from '@/utils/game/stamina/depletion';
import {
  getActualRecoveryAmount,
  offsetEventLogStamina,
  updateLogStaminaFromLast,
} from '@/utils/game/stamina/events/utils';


type GetLogsWithStaminaRecoveryOpts = {
  logs: StaminaEventLog[],
  recoveries: StaminaRecovery[],
  recoveryRate: StaminaRecoveryRateConfig,
  recoveryEventType: StaminaEventType,
};

export const getLogsWithStaminaRecovery = ({
  logs,
  recoveries,
  recoveryRate,
  recoveryEventType,
}: GetLogsWithStaminaRecoveryOpts): StaminaEventLog[] => {
  const newLogs: StaminaEventLog[] = [logs[0]];

  let recoveryCount = 0;
  let recoveredAmount = 0;

  for (const log of logs.slice(1)) {
    let recoveryData = recoveries.at(recoveryCount);

    while (recoveryData && log.timing >= recoveryData.timing) {
      const latest = newLogs[newLogs.length - 1];
      const staminaBefore = getStaminaAfterDuration({
        start: latest.stamina.after,
        duration: recoveryData.timing - latest.timing,
      });
      const staminaBeforeUnderlying = getStaminaAfterDuration({
        start: latest.staminaUnderlying.after,
        duration: recoveryData.timing - latest.timing,
      });

      const currentRecoveryAmount = getActualRecoveryAmount({
        amount: recoveryData.getBaseAmount(staminaBefore.inGame),
        recoveryRate,
        isSleep: false,
      });

      newLogs.push({
        type: recoveryEventType,
        timing: recoveryData.timing,
        stamina: {
          before: staminaBefore.inGame,
          after: Math.min(staminaBefore.inGame + currentRecoveryAmount, staminaAbsoluteMax),
        },
        staminaUnderlying: {
          before: staminaBeforeUnderlying.actual,
          after: Math.min(staminaBeforeUnderlying.actual + currentRecoveryAmount, staminaAbsoluteMax),
        },
      });
      recoveryCount += 1;
      recoveredAmount += currentRecoveryAmount;
      recoveryData = recoveries.at(recoveryCount);
    }

    // Using indexer to guarantee the last log is returned
    // This shouldn't fail because `newLogs` already have something inside at the beginning
    const lastLog = newLogs[newLogs.length - 1];

    if ((!recoveryCount || lastLog.type !== recoveryEventType) && recoveryData) {
      newLogs.push(offsetEventLogStamina({
        log,
        offset: recoveredAmount,
      }));
      continue;
    }

    newLogs.push(updateLogStaminaFromLast({
      source: log,
      last: lastLog,
    }));
  }

  return newLogs;
};
