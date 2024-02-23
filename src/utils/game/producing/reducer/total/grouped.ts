import {Production} from '@/types/game/producing/rate/base';
import {GroupedProduction} from '@/types/game/producing/rate/main';
import {toSum} from '@/utils/array';
import {isNotNullish, KeysOfType} from '@/utils/type';


type GetTotalOfGroupedProductionOpts = {
  rate: GroupedProduction<number>,
  key: KeysOfType<Production, number>,
};

export const getTotalOfGroupedProduction = ({rate, key}: GetTotalOfGroupedProductionOpts) => {
  return toSum(Object.values(rate).filter(isNotNullish).map((rate) => rate[key]));
};
