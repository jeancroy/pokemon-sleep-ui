import {ProducingRateOfDrop} from '@/types/game/producing/rate';
import {toSum} from '@/utils/array';
import {getAverage} from '@/utils/number/average';


type GetMergedRateOfDropOpts = {
  rates: ProducingRateOfDrop[],
  baseFrequency: number,
};

export const getMergedRateOfDrop = ({
  rates,
  baseFrequency,
}: GetMergedRateOfDropOpts): ProducingRateOfDrop => {
  const firstRate = rates.at(0);

  if (!firstRate) {
    throw new Error('Empty rate data for merging');
  }

  // Destruct then return so it errors when a new property is introduced in `ProducingRateOfDrop`
  const {id, period} = firstRate;
  const triggerRate = toSum(rates.map(({triggerRate}) => triggerRate));

  return {
    id,
    period,
    frequency: baseFrequency / triggerRate,
    triggerRate,
    strength: toSum(rates.map(({strength}) => strength)),
    strengthPerHelp: getAverage(rates.map(({strengthPerHelp}) => strengthPerHelp)),
    qty: toSum(rates.map(({qty}) => qty)),
    qtyPerHelp: getAverage(rates.map(({qtyPerHelp}) => qtyPerHelp)),
  };
};
