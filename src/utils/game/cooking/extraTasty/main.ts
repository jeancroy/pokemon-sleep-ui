// Credit to Discord @jeancroy for algo
import {mealsPerWeek} from '@/const/game/cooking/common';
import {ExtraTastyByMealAlgorithmInfo, ExtraTastyInfo, ExtraTastyInfoUnit} from '@/types/game/cooking/extraTasty';
import {convertExtraTastyUnitsToInfo} from '@/utils/game/cooking/extraTasty/convert';
import {getExtraTastyLookupOfNextMeal} from '@/utils/game/cooking/extraTasty/lookup/main';
import {getExtraTastyRateOfMeal} from '@/utils/game/cooking/extraTasty/single';
import {
  ExtraTastyBranch,
  ExtraTastyLookup,
  ExtraTastySkillBoostPercentByMeal,
  ExtraTastyLookupOptions,
} from '@/utils/game/cooking/extraTasty/type';
import {
  getCurrentExtraTastySkillBoostPercent,
  getExtraTastyAvgMultiplier,
  getExtraTastyTiming,
} from '@/utils/game/cooking/extraTasty/utils';
import {Nullable} from '@/utils/type';


type GetExtraTastyInfoOpts = {
  skillBoostPercentByMeal: ExtraTastySkillBoostPercentByMeal,
  extraTastyLookupOptions: Nullable<ExtraTastyLookupOptions>,
};

export const getExtraTastyInfo =
    ({skillBoostPercentByMeal, extraTastyLookupOptions}: GetExtraTastyInfoOpts): ExtraTastyInfo => {
      const byMeal: ExtraTastyInfoUnit[] = [];
      const byMealAlgorithmInfo: ExtraTastyByMealAlgorithmInfo[] = [];


      // Week start, no extra tasty skill stacked
      const origin: ExtraTastyBranch = {
        extraTastyPercentFromSkill: 0,
        probability: 1,
      };
      let lookup: ExtraTastyLookup = new Map([
        [origin.extraTastyPercentFromSkill, origin],
      ]);

      // 21 meals throughout the week
      for (let mealIdx = 0; mealIdx < mealsPerWeek; mealIdx++) {
        const extraTastyTiming = getExtraTastyTiming(mealIdx);

        const extraTastySkillBoostPercent = getCurrentExtraTastySkillBoostPercent({
          skillBoostPercentByMeal,
          mealIdx,
        });

        const mealExtraTastyRate = getExtraTastyRateOfMeal({lookup, extraTastyTiming});
        const mealAvgMultiplier = getExtraTastyAvgMultiplier({
          mealExtraTastyRate,
          extraTastyTiming,
        });

        byMeal.push({
          rate: mealExtraTastyRate,
          multiplier: mealAvgMultiplier,
        });

        byMealAlgorithmInfo.push({
          sizeOfState: lookup.size,
        });

        lookup = getExtraTastyLookupOfNextMeal({
          extraTastyLookupOptions,
          lookup,
          extraTastyTiming,
          extraTastySkillBoostPercent,
        });
      }

      return convertExtraTastyUnitsToInfo(byMeal, byMealAlgorithmInfo);
    };
