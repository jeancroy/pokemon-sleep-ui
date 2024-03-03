import {ExtraTastyTiming} from '@/types/game/cooking/extraTasty';
import {updateExtraTastyLookup} from '@/utils/game/cooking/extraTasty/lookup/merge';
import {getExtraTastySplitBranch} from '@/utils/game/cooking/extraTasty/lookup/split';
import {ExtraTastyLookup} from '@/utils/game/cooking/extraTasty/type';


type GetExtraTastyMergedLookupOpts = {
  lookup: ExtraTastyLookup,
  extraTastyTiming: ExtraTastyTiming,
  extraTastySkillBoostPercent: number,
};

export const getExtraTastyLookupOfNextMeal = ({
  lookup,
  extraTastyTiming,
  extraTastySkillBoostPercent,
}: GetExtraTastyMergedLookupOpts): ExtraTastyLookup => {
  const nextMealLookup: ExtraTastyLookup = new Map();

  for (const parent of lookup.values()) {
    const {pass, fail} = getExtraTastySplitBranch({
      parent,
      extraTastyTiming,
      extraTastySkillBoostPercent,
    });
    updateExtraTastyLookup({lookup: nextMealLookup, branch: pass});
    updateExtraTastyLookup({lookup: nextMealLookup, branch: fail});
  }

  return nextMealLookup;
};
