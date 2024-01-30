import {StaminaEfficiencyCounter} from '@/types/game/stamina/efficiency';
import {StaminaEventLog} from '@/types/game/stamina/event';
import {getEfficiency} from '@/utils/game/stamina/efficiency';


type GetStaminaEfficiencyMultiplierFromLogsOpts = {
  logs: StaminaEventLog[],
  hasSecondary: boolean,
};

export const getStaminaEfficiencyMultiplierFromLogs = ({
  logs,
  hasSecondary,
}: GetStaminaEfficiencyMultiplierFromLogsOpts): StaminaEfficiencyCounter<number | null> => {
  const durationCounter: StaminaEfficiencyCounter = {
    awake: 0,
    sleep1: 0,
    sleep2: 0,
    average: 0,
  };
  const weightedDurationCounter: StaminaEfficiencyCounter = {
    awake: 0,
    sleep1: 0,
    sleep2: 0,
    average: 0,
  };

  let isAsleep = false;
  let isAnySleepCounted = false;

  for (let i = 1; i < logs.length; i++) {
    const prev = logs[i - 1];
    const curr = logs[i];

    const blockEfficiency = getEfficiency({stamina: prev.stamina.after});
    const durationOfLog = curr.timing - prev.timing;

    const weightedDuration = blockEfficiency * durationOfLog;

    durationCounter.average += durationOfLog;
    weightedDurationCounter.average += weightedDuration;
    if (isAsleep) {
      if (hasSecondary && !isAnySleepCounted) {
        durationCounter.sleep2 += durationOfLog;
        weightedDurationCounter.sleep2 += weightedDuration;
      } else {
        durationCounter.sleep1 += durationOfLog;
        weightedDurationCounter.sleep1 += weightedDuration;
      }
    } else {
      durationCounter.awake += durationOfLog;
      weightedDurationCounter.awake += weightedDuration;
    }

    if (curr.type === 'sleep') {
      isAsleep = true;
    } else if (isAsleep && curr.type === 'wakeup') {
      isAsleep = false;
      isAnySleepCounted = true;
    }
  }

  return {
    sleep1: weightedDurationCounter.sleep1 / durationCounter.sleep1,
    sleep2: hasSecondary ? weightedDurationCounter.sleep2 / durationCounter.sleep2 : null,
    awake: weightedDurationCounter.awake / durationCounter.awake,
    average: weightedDurationCounter.average / durationCounter.average,
  };
};
