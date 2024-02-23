import {ProductionOfDrop, ProductionOfDropByStateWithPack} from '@/types/game/producing/rate/base';
import {toFinalProductionOfDrop} from '@/utils/game/producing/toFinal/ofDrop';
import {ToFinalProductionOfDropCommonOpts} from '@/utils/game/producing/toFinal/type';


type GetMainSkillProductionFinalOpts = ToFinalProductionOfDropCommonOpts & {
  base: ProductionOfDrop,
};

export const getMainSkillProductionFinal = (
  opts: GetMainSkillProductionFinalOpts,
): ProductionOfDropByStateWithPack => {
  return toFinalProductionOfDrop({
    produceType: 'skill',
    ...opts,
  });
};
