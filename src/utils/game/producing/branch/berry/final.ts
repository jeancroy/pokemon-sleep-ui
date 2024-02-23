import {ProductionOfDrop, ProductionOfDropByStateWithPack} from '@/types/game/producing/rate/base';
import {toFinalProductionOfDrop} from '@/utils/game/producing/toFinal/ofDrop';
import {ToFinalProductionOfDropCommonOpts} from '@/utils/game/producing/toFinal/type';


type GetBerryProductionFinalOpts = ToFinalProductionOfDropCommonOpts & {
  base: ProductionOfDrop,
};

export const getBerryProductionFinal = (
  opts: GetBerryProductionFinalOpts,
): ProductionOfDropByStateWithPack => {
  return toFinalProductionOfDrop({
    produceType: 'berry',
    ...opts,
  });
};
