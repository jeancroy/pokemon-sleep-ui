import {FullPackStatsOfSleep} from '@/types/game/producing/inventory';
import {formatSeconds} from '@/utils/time';
import {Nullable} from '@/utils/type';


export const getPokemonTimeToFullPackText = (fullPackStatsOfSleep: Nullable<FullPackStatsOfSleep>): string => {
  if (!fullPackStatsOfSleep) {
    return '-';
  }

  const {duration} = fullPackStatsOfSleep;
  if (!duration.filled) {
    return '-';
  }

  return formatSeconds({seconds: duration.vacant});
};
