import {ProducingRateOfDrop, ProducingRateOfDropByStateWithPack} from '@/types/game/producing/rate';
import {toFinalProducingRateOfDrop} from '@/utils/game/producing/toFinal/ofDrop';
import {ToFinalProducingRateOfDropCommonOpts} from '@/utils/game/producing/toFinal/type';


type GetIngredientProducingRateFinalListOpts = ToFinalProducingRateOfDropCommonOpts & {
  baseList: ProducingRateOfDrop[],
};

export const getIngredientProducingRateFinalList = ({
  baseList,
  ...opts
}: GetIngredientProducingRateFinalListOpts): ProducingRateOfDropByStateWithPack[] => {
  return baseList.map((base) => toFinalProducingRateOfDrop({
    base,
    produceType: 'ingredient',
    ...opts,
  }));
};
