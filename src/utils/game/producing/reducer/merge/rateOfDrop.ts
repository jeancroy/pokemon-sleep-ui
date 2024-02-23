import {ProductionOfDrop} from '@/types/game/producing/rate/base';
import {toSum} from '@/utils/array';
import {getAverage} from '@/utils/number/average';


type GetMergedRateOfDropOpts = {
  rates: ProductionOfDrop[],
  baseFrequency: number,
};

export const getMergedRateOfDrop = ({
  rates,
  baseFrequency,
}: GetMergedRateOfDropOpts): ProductionOfDrop => {
  const firstRate = rates.at(0);

  if (!firstRate) {
    throw new Error('Empty rate data for merging');
  }

  // Destruct then return so it errors when a new property is introduced in `ProductionOfDrop`
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
