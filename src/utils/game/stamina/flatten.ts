import {staminaDepleteInterval} from '@/const/game/stamina';
import {StaminaAtEvent, StaminaEventLog, StaminaEventLogFlattened} from '@/types/game/stamina/event';
import {getEfficiency} from '@/utils/game/stamina/efficiency';


type ToFlattenedStaminaEventLogOpts = {
  log: StaminaEventLog,
  key: keyof StaminaAtEvent,
};

const toFlattenedStaminaEventLog = ({log, key}: ToFlattenedStaminaEventLogOpts): StaminaEventLogFlattened => {
  const {staminaUnderlying, type} = log;
  const stamina = log.stamina[key];

  return {
    ...log,
    stamina,
    staminaUnderlying: staminaUnderlying[key],
    efficiency: getEfficiency({stamina}),
    isAsleep: type === 'sleep',
  };
};

const expandStaminaEventLog = (log: StaminaEventLog): StaminaEventLogFlattened[] => {
  const {type} = log;

  if (type === 'sleep') {
    return [toFlattenedStaminaEventLog({log, key: 'before'})];
  }

  if (type === 'wakeup') {
    return [
      toFlattenedStaminaEventLog({log, key: 'before'}),
      toFlattenedStaminaEventLog({log, key: 'after'}),
    ];
  }

  if (type === 'efficiencyBlock') {
    return [toFlattenedStaminaEventLog({log, key: 'before'})];
  }

  if (type === 'skillRecovery') {
    return [
      toFlattenedStaminaEventLog({log, key: 'before'}),
      toFlattenedStaminaEventLog({log, key: 'after'}),
    ];
  }

  if (type === 'endOfPeriod') {
    return [toFlattenedStaminaEventLog({log, key: 'before'})];
  }

  throw new Error(`Failed to flatten the stamina event log of type [${type satisfies never}]`);
};

export const getStaminaEventLogsFlattened = (logs: StaminaEventLog[]): StaminaEventLogFlattened[] => {
  const originalFlattened = logs.flatMap(expandStaminaEventLog);

  // The first element of `originalFlattened` should always be the stamina at `wakeup.before`
  // Since the very first `wakeup` is not important here, `flattened` is initialized as an empty array,
  // and the subsequent checking loop starts from index 1
  const flattened: StaminaEventLogFlattened[] = [];
  let isAsleep = false;

  for (let i = 1; i < originalFlattened.length; i++) {
    const stop = originalFlattened[i];
    let last = flattened.at(-1);
    let nextTiming = last ? last.timing + staminaDepleteInterval : null;

    if (last?.type === 'sleep') {
      isAsleep = true;
    } else if (last?.type === 'wakeup') {
      isAsleep = false;
    }

    while (last && nextTiming && nextTiming < stop.timing) {
      const stamina = Math.max(0, last.stamina - 1);

      const expanded: StaminaEventLogFlattened = {
        type: stop.type === 'wakeup' ? 'sleep' : null,
        timing: nextTiming,
        stamina,
        staminaUnderlying: last.staminaUnderlying - 1,
        efficiency: getEfficiency({stamina}),
        isAsleep,
      };

      flattened.push(expanded);

      last = expanded;
      nextTiming = expanded.timing + staminaDepleteInterval;
    }

    flattened.push({
      ...stop,
      // Need to override `isAsleep` in `stop` to correctly reflect the status
      isAsleep,
    });
  }

  return flattened;
};
