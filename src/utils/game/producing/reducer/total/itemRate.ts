import {Production, ProductionByCalculatedStates} from '@/types/game/producing/rate/base';
import {ProducingStateCalculated} from '@/types/game/producing/state';
import {toSum} from '@/utils/array';
import {KeysOfType} from '@/utils/type';


type GetTotalOfItemRatesOpts = {
  rates: ProductionByCalculatedStates[],
  target: KeysOfType<Production, number>,
  state: ProducingStateCalculated,
};

export const getTotalOfItemRates = ({rates, target, state}: GetTotalOfItemRatesOpts): number => (
  toSum(rates.map((rate) => rate[target][state]))
);
