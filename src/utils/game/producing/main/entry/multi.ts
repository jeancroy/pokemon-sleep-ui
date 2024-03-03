import {maxTeamMemberCount} from '@/const/game/production/const';
import {defaultProductionCalcBehavior, defaultProductionPeriod} from '@/const/game/production/defaults';
import {IngredientMap} from '@/types/game/ingredient';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {PokemonProductionFinalCollection} from '@/types/game/producing/rate/main';
import {ProducingStateCalculated} from '@/types/game/producing/state';
import {CalculatedCookingConfig} from '@/types/userData/config/cooking/main';
import {groupPokemonProduction} from '@/utils/game/producing/group';
import {getPokemonProductionHelpingBonusEffect} from '@/utils/game/producing/main/entry/parts/helpingBonus';
import {
  getPokemonProductionIngredientMultiplier,
} from '@/utils/game/producing/main/entry/parts/ingredientMultiplier';
import {getPokemonProductionFinal} from '@/utils/game/producing/main/entry/stages/final/main';
import {getPokemonProductionInitialRates} from '@/utils/game/producing/main/entry/stages/initial/main';
import {
  getPokemonProductionPostMultiplier,
} from '@/utils/game/producing/main/entry/stages/postMultiplier/main';
import {
  GetPokemonProductionSharedOpts,
  GetPokemonProductionUnitOptsWithPayload,
} from '@/utils/game/producing/main/type';
import {isNotNullish} from '@/utils/type';


export type GetPokemonProductionMultiOpts<TPayload> = {
  ingredientMap: IngredientMap,
  recipeLevelData: RecipeLevelData[],
  rateOpts: GetPokemonProductionUnitOptsWithPayload<TPayload>[],
  sharedOpts: GetPokemonProductionSharedOpts,
  groupingState: ProducingStateCalculated,
  calculatedCookingConfig: CalculatedCookingConfig,
};

export const getPokemonProductionMulti = <TPayload>({
  ingredientMap,
  recipeLevelData,
  rateOpts,
  sharedOpts,
  groupingState,
  calculatedCookingConfig,
}: GetPokemonProductionMultiOpts<TPayload>): PokemonProductionFinalCollection<TPayload> => {
  let {
    period,
    calcBehavior,
    subSkillBonusOverride,
  } = sharedOpts;

  // Override with default values
  period ??= defaultProductionPeriod;
  calcBehavior ??= defaultProductionCalcBehavior;

  const subSkillBonuses = subSkillBonusOverride ?? rateOpts
    .map(({opts}) => opts.individual.subSkillBonus)
    .filter(isNotNullish);

  const helpingBonusEffect = getPokemonProductionHelpingBonusEffect({
    subSkillBonuses,
    calcBehavior,
  });

  // # Initial rate
  // This calculates the rate twice with the 1st pass calculating E4E only; 2nd pass calculating everything
  const initialRates = getPokemonProductionInitialRates({
    helpingBonusEffect,
    subSkillBonuses,
    rateOpts,
    sharedOpts,
    calcBehavior,
  });

  // # Post Multiplier rate
  // This applies various multipliers to the rates, splitting them to `original` and `final`
  const postMultiplierRates = getPokemonProductionPostMultiplier({
    rates: initialRates,
    ingredientMultiplier: getPokemonProductionIngredientMultiplier({
      period,
      ingredientMap,
      recipeLevelData,
      calculatedCookingConfig,
      groupedOriginalRates: groupPokemonProduction({
        period,
        rates: initialRates.map(({rate}) => rate),
        state: groupingState,
      }),
    }),
  });

  // # Final rate
  // This calculation factors in any skill triggered by other Pokémon
  const finalRates = getPokemonProductionFinal({
    postMultiplierRates,
    targetCount: calcBehavior?.asSingle ? maxTeamMemberCount : rateOpts.length,
  });

  return {
    rates: finalRates,
    grouped: groupPokemonProduction({
      period,
      rates: finalRates.map(({atStage}) => atStage.final),
      state: groupingState,
    }),
  };
};
