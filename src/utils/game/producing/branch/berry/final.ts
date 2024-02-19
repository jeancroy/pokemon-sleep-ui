import {ProducingRateOfDrop, ProducingRateOfDropByStateWithPack} from '@/types/game/producing/rate';
import {toFinalProducingRateOfDrop} from '@/utils/game/producing/toFinal/ofDrop';
import {ToFinalProducingRateOfDropCommonOpts} from '@/utils/game/producing/toFinal/type';


type GetBerryProducingRateFinalOpts = ToFinalProducingRateOfDropCommonOpts & {
  base: ProducingRateOfDrop,
};

export const getBerryProducingRateFinal = (
  opts: GetBerryProducingRateFinalOpts,
): ProducingRateOfDropByStateWithPack => {
  return toFinalProducingRateOfDrop({
    produceType: 'berry',
    ...opts,
  });
};
