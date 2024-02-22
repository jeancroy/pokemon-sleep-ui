import {ProducingRate} from '@/types/game/producing/rate/base';
import {GroupedProducingRate} from '@/types/game/producing/rate/main';
import {toSum} from '@/utils/array';
import {isNotNullish, KeysOfType} from '@/utils/type';


type GetTotalOfGroupedProducingRateOpts = {
  rate: GroupedProducingRate<number>,
  key: KeysOfType<ProducingRate, number>,
};

export const getTotalOfGroupedProducingRate = ({rate, key}: GetTotalOfGroupedProducingRateOpts) => {
  return toSum(Object.values(rate).filter(isNotNullish).map((rate) => rate[key]));
};
