import {extraTastyBasePercent} from '@/const/game/cooking/extraTasty';
import {ExtraTastyTiming} from '@/types/game/cooking/extraTasty';
import {ExtraTastyLookup} from '@/utils/game/cooking/extraTasty/type';


type GetExtraTastyRateOfMealOpts = {
  lookup: ExtraTastyLookup,
  extraTastyTiming: ExtraTastyTiming,
};

export const getExtraTastyRateOfMeal = ({lookup, extraTastyTiming}: GetExtraTastyRateOfMealOpts): number => {
  const extraTastyMealBasePercent = extraTastyBasePercent[extraTastyTiming];

  let totalExtraTastyPercent = 0;
  let totalRate = 0;

  for (const branch of lookup.values()) {
    totalExtraTastyPercent += (extraTastyMealBasePercent + branch.extraTastyPercentFromSkill) * branch.probability;
    totalRate += branch.probability;
  }

  if (Math.abs(totalRate - 1) >= 1E-6) {
    throw new Error(
      'Total probability should be 1 (above tolerance), contact the developer Discord @raenonx',
    );
  }

  return totalExtraTastyPercent / 100;
};
