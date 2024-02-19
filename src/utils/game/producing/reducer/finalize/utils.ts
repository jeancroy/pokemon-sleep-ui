import {ProducingRateOfDrop, ProducingRateOfDropByStateWithPack} from '@/types/game/producing/rate';
import {ProducingStateWithPack, producingStateWithPack} from '@/types/game/producing/state';
import {KeysOfType} from '@/utils/type';


type ExtractProducingValueForFinalizationOpts = {
  rate: ProducingRateOfDropByStateWithPack,
  key: KeysOfType<ProducingRateOfDrop, number>,
  multiplier: number,
};

export const extractProducingValueForFinalization = ({
  rate,
  key,
  multiplier,
}: ExtractProducingValueForFinalizationOpts) => {
  return Object.fromEntries(producingStateWithPack.map((state) => [
    state,
    rate[state][key] * multiplier,
  ])) as {[state in ProducingStateWithPack]: number};
};
