import {staminaAbsoluteMax} from '@/const/game/stamina';
import {StaminaAtEvent, StaminaEventLog, StaminaEventType} from '@/types/game/stamina/event';
import {StaminaRecovery} from '@/types/game/stamina/recovery';
import {getStaminaAfterDuration} from '@/utils/game/stamina/depletion';
import {offsetEventLogStamina, updateLogStaminaFromLast} from '@/utils/game/stamina/events/utils';


type GetLogsWithStaminaRecoveryOpts = {
  logs: StaminaEventLog[],
  recoveries: StaminaRecovery[],
  recoveryEventType: StaminaEventType,
};

export const getLogsWithStaminaRecovery = ({
  logs,
  recoveries,
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

      const currentRecoveryAmount = recoveryData.getAmount(staminaBefore.inGame);
      const staminaUpdated: StaminaAtEvent = {
        before: staminaBefore.inGame,
        after: Math.min(staminaBefore.inGame + currentRecoveryAmount, staminaAbsoluteMax),
      };

      newLogs.push({
        type: recoveryEventType,
        timing: recoveryData.timing,
        stamina: staminaUpdated,
        staminaUnderlying: staminaUpdated,
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
