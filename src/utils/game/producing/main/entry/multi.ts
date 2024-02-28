import {maxTeamMemberCount} from '@/const/game/production/const';
import {defaultProductionCalcBehavior, defaultProductionPeriod} from '@/const/game/production/defaults';
import {IngredientMap} from '@/types/game/ingredient';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {PokemonProductionFinal} from '@/types/game/producing/rate/main';
import {ProducingStateCalculated} from '@/types/game/producing/state';
import {CalculatedCookingConfig} from '@/types/userData/config/cooking/main';
import {groupPokemonProduction} from '@/utils/game/producing/group';
import {getPokemonProductionHelpingBonusEffect} from '@/utils/game/producing/main/entry/components/helpingBonus';
import {getPokemonProductionFinal} from '@/utils/game/producing/main/entry/components/rates/final';
import {getPokemonProductionInitialRates} from '@/utils/game/producing/main/entry/components/rates/initial/main';
import {
  getPokemonProductionPostIngredientMultiplier,
} from '@/utils/game/producing/main/entry/components/rates/postIngredient';
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
}: GetPokemonProductionMultiOpts<TPayload>): PokemonProductionFinal<TPayload> => {
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

  // Initial rate calculates base production without factoring in any skill by other Pokémon
  const initialRates = getPokemonProductionInitialRates({
    helpingBonusEffect,
    subSkillBonuses,
    rateOpts,
    sharedOpts,
    calcBehavior,
  });

  const initialRatesPostIngredient = getPokemonProductionPostIngredientMultiplier({
    groupingState,
    rates: initialRates,
    ingredientMultiplierOpts: {
      period,
      ingredientMap,
      recipeLevelData,
      calculatedCookingConfig,
    },
  });

  // Final calculation factors in any skill triggered by other Pokémon
  const finalRates = getPokemonProductionFinal({
    initialRatesPostIngredient,
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
