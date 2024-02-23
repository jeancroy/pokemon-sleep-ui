import {ProductionOfDrop, ProductionOfDropByStateWithPack} from '@/types/game/producing/rate/base';
import {toFinalProductionOfDrop} from '@/utils/game/producing/toFinal/ofDrop';
import {ToFinalProductionOfDropCommonOpts} from '@/utils/game/producing/toFinal/type';


type GetIngredientProductionFinalListOpts = ToFinalProductionOfDropCommonOpts & {
  baseList: ProductionOfDrop[],
};

export const getIngredientProductionFinalList = ({
  baseList,
  ...opts
}: GetIngredientProductionFinalListOpts): ProductionOfDropByStateWithPack[] => {
  return baseList.map((base) => toFinalProductionOfDrop({
    base,
    produceType: 'ingredient',
    ...opts,
  }));
};
