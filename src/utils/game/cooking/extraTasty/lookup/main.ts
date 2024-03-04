import {ExtraTastyTiming} from '@/types/game/cooking/extraTasty';
import {updateExtraTastyLookup} from '@/utils/game/cooking/extraTasty/lookup/merge';
import {getExtraTastySplitBranch} from '@/utils/game/cooking/extraTasty/lookup/split';
import {ExtraTastyLookup, ExtraTastyLookupOptions} from '@/utils/game/cooking/extraTasty/type';
import {Nullable} from '@/utils/type';


type GetExtraTastyMergedLookupOpts = {
  lookup: ExtraTastyLookup,
  extraTastyTiming: ExtraTastyTiming,
  extraTastySkillBoostPercent: number,
  extraTastyLookupOptions:Nullable<ExtraTastyLookupOptions>,
};

export const getExtraTastyLookupOfNextMeal = ({
  lookup,
  extraTastyTiming,
  extraTastySkillBoostPercent,
  extraTastyLookupOptions,
}: GetExtraTastyMergedLookupOpts): ExtraTastyLookup => {
  const nextMealLookup: ExtraTastyLookup = new Map();

  for (const parent of lookup.values()) {
    const {pass, fail} = getExtraTastySplitBranch({
      parent,
      extraTastyTiming,
      extraTastySkillBoostPercent,
    });
    updateExtraTastyLookup({lookup: nextMealLookup, branch: pass, extraTastyLookupOptions});
    updateExtraTastyLookup({lookup: nextMealLookup, branch: fail, extraTastyLookupOptions});
  }

  return nextMealLookup;
};
