import {SleepSessions} from '@/types/game/sleep';
import {EfficiencyInterval} from '@/types/game/stamina/efficiency';
import {StaminaEventLog} from '@/types/game/stamina/event';
import {getEfficiency} from '@/utils/game/stamina/efficiency';


type ExtractIntervalsDuringSleepOpts = {
  logs: StaminaEventLog[],
  hasSecondary: boolean
};

export const extractIntervalsDuringSleep = ({
  logs,
  hasSecondary,
}: ExtractIntervalsDuringSleepOpts): SleepSessions<EfficiencyInterval[]> => {
  const ret: SleepSessions<EfficiencyInterval[]> = {
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
