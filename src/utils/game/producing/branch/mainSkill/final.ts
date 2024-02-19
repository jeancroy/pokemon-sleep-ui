import {ProducingRateOfDrop, ProducingRateOfDropByStateWithPack} from '@/types/game/producing/rate';
import {toFinalProducingRateOfDrop} from '@/utils/game/producing/toFinal/ofDrop';
import {ToFinalProducingRateOfDropCommonOpts} from '@/utils/game/producing/toFinal/type';


type GetMainSkillProducingRateFinalOpts = ToFinalProducingRateOfDropCommonOpts & {
  base: ProducingRateOfDrop,
};

export const getMainSkillProducingRateFinal = (
  opts: GetMainSkillProducingRateFinalOpts,
): ProducingRateOfDropByStateWithPack => {
  return toFinalProducingRateOfDrop({
    produceType: 'skill',
    ...opts,
  });
};
