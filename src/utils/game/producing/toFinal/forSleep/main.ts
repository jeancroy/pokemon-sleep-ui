import {ProductionOfDropInSleep} from '@/types/game/producing/rate/base';
import {toFinalProductionForSleepOfRegular} from '@/utils/game/producing/toFinal/forSleep/ofRegular';
import {toFinalProductionForSleepOfSkill} from '@/utils/game/producing/toFinal/forSleep/ofSkill';
import {ToFinalProductionForSleepCommonOpts} from '@/utils/game/producing/toFinal/forSleep/type';


export const toFinalProductionForSleep = (opts: ToFinalProductionForSleepCommonOpts): ProductionOfDropInSleep => {
  const {produceType} = opts;

  if (produceType === 'skill') {
    return toFinalProductionForSleepOfSkill(opts);
  }

  return toFinalProductionForSleepOfRegular(opts);
};
