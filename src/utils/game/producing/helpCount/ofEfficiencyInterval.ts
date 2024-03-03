import {EfficiencyInterval} from '@/types/game/stamina/efficiency';
import {toSum} from '@/utils/array';


type GetHelpCountOfEfficiencyIntervalsOpts = {
  efficiencyIntervals: EfficiencyInterval[],
  baseFrequency: number,
};

export const getHelpCountOfEfficiencyIntervals = ({
  efficiencyIntervals,
  baseFrequency,
}: GetHelpCountOfEfficiencyIntervalsOpts): number => {
  return toSum(efficiencyIntervals.map(({efficiency, duration}) => duration / (baseFrequency / efficiency)));
};
