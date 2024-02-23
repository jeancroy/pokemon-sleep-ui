import {ProductionOfDrop, ProductionOfDropByStateWithPack} from '@/types/game/producing/rate/base';
import {ProducingStateWithPack, producingStateWithPack} from '@/types/game/producing/state';
import {KeysOfType} from '@/utils/type';


type ExtractProducingValueForFinalizationOpts = {
  rateFinal: ProductionOfDropByStateWithPack,
  key: KeysOfType<ProductionOfDrop, number>,
  multiplier: number,
};

export const extractProducingValueForFinalization = ({
  rateFinal,
  key,
  multiplier,
}: ExtractProducingValueForFinalizationOpts) => {
  return Object.fromEntries(producingStateWithPack.map((state) => [
    state,
    rateFinal[state][key] * multiplier,
  ])) as {[state in ProducingStateWithPack]: number};
};
