import {EfficiencyInterval, EfficiencyIntervalsBySleepSession} from '@/types/game/stamina/efficiency';
import {StaminaEventLog} from '@/types/game/stamina/event';
import {getEfficiency} from '@/utils/game/stamina/efficiency';


type ExtractEfficiencyIntervalsDuringSleepOpts = {
  logs: StaminaEventLog[],
  hasSecondary: boolean,
};

export const extractEfficiencyIntervalsDuringSleep = ({
  logs,
  hasSecondary,
}: ExtractEfficiencyIntervalsDuringSleepOpts): EfficiencyIntervalsBySleepSession => {
  const ret: EfficiencyIntervalsBySleepSession = {
    primary: [],
    secondary: hasSecondary ? [] : null,
  };

  let isAsleep = false;
  let isAnyExtractionCompleted = false;
  for (let i = 1; i < logs.length; i++) {
    const last = logs[i - 1];
    const curr = logs[i];

    if (!isAsleep) {
      if (last.type !== 'sleep') {
        continue;
      }

      isAsleep = true;
    } else if (last.type === 'wakeup') {
      isAsleep = false;
      isAnyExtractionCompleted = true;
      continue;
    }

    const interval: EfficiencyInterval = {
      efficiency: getEfficiency({stamina: last.stamina.after}),
      duration: curr.timing - last.timing,
    };

    if (hasSecondary && !isAnyExtractionCompleted) {
      ret.secondary?.push(interval);
    } else {
      ret.primary.push(interval);
    }
  }

  return ret;
};
