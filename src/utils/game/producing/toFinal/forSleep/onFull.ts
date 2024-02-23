import {ProductionOfDrop, ProductionOfDropInSleep} from '@/types/game/producing/rate/base';
import {toFinalProductionFromBase} from '@/utils/game/producing/toFinal/utils';


export const toFinalProductionForSleepOnFullPack = (base: ProductionOfDrop): ProductionOfDropInSleep => {
  return {
    vacant: toFinalProductionFromBase({
      base,
      isFullPack: true,
    }),
    filled: toFinalProductionFromBase({
      base,
      isFullPack: true,
    }),
  };
};
