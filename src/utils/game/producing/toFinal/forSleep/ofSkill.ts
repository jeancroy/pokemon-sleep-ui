import {ProductionOfDropInSleep} from '@/types/game/producing/rate/base';
import {getNoSkillProbability} from '@/utils/game/producing/skill/noTrigger';
import {toFinalProductionForSleepOnFullPack} from '@/utils/game/producing/toFinal/forSleep/onFull';
import {ToFinalProductionForSleepCommonOpts} from '@/utils/game/producing/toFinal/forSleep/type';
import {toFinalProductionFromBase} from '@/utils/game/producing/toFinal/utils';


export const toFinalProductionForSleepOfSkill = ({
  base,
  fullPackStatsOfSleep,
  sleepDuration,
  skillTrigger,
}: ToFinalProductionForSleepCommonOpts): ProductionOfDropInSleep => {
  if (!fullPackStatsOfSleep || !sleepDuration) {
    return toFinalProductionForSleepOnFullPack(base);
  }

  const {duration} = fullPackStatsOfSleep;
  const {strengthPerHelp} = base;

  const qty = 1 - (getNoSkillProbability({
    fullPackStatsOfSleep,
    skillTrigger,
  }) ?? 1);

  return {
    vacant: toFinalProductionFromBase({
      base,
      override: {
        qty,
        strength: qty * strengthPerHelp,
        frequency: Math.max(duration.vacant / qty, sleepDuration),
      },
    }),
    filled: toFinalProductionFromBase({base, isFullPack: true}),
  };
};
