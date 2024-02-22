import {maxTeamMemberCount} from '@/const/game/production/const';
import {defaultProductionPeriod} from '@/const/game/production/defaults';
import {IngredientMap} from '@/types/game/ingredient';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {PokemonProducingRateFinal} from '@/types/game/producing/rate/main';
import {ProducingStateCalculated} from '@/types/game/producing/state';
import {CalculatedCookingConfig} from '@/types/userData/config/cooking/main';
import {groupPokemonProducingRate} from '@/utils/game/producing/group';
import {getPokemonProducingRateHelpingBonusEffect} from '@/utils/game/producing/main/entry/components/helpingBonus';
import {getPokemonProducingRateFinal} from '@/utils/game/producing/main/entry/components/rates/final';
import {getPokemonProductionFirstPassRates} from '@/utils/game/producing/main/entry/components/rates/firstPass';
import {
  getPokemonProductionPostIngredientMultiplier,
} from '@/utils/game/producing/main/entry/components/rates/postIngredient';
import {
  GetPokemonProducingRateUnitOptsWithPayload,
  GetProducingRateSharedOpts,
} from '@/utils/game/producing/main/type';
import {isNotNullish} from '@/utils/type';


export type GetPokemonProducingRateMultiOpts<TPayload> = {
  ingredientMap: IngredientMap,
  recipeLevelData: RecipeLevelData[],
  rateOpts: GetPokemonProducingRateUnitOptsWithPayload<TPayload>[],
  sharedOpts: GetProducingRateSharedOpts,
  groupingState: ProducingStateCalculated,
  calculatedCookingConfig: CalculatedCookingConfig,
};

export const getPokemonProducingRateMulti = <TPayload>({
  ingredientMap,
  recipeLevelData,
  rateOpts,
  sharedOpts,
  groupingState,
  calculatedCookingConfig,
}: GetPokemonProducingRateMultiOpts<TPayload>): PokemonProducingRateFinal<TPayload> => {
  const {
    calcBehavior,
    subSkillBonusOverride,
  } = sharedOpts;

  const period = sharedOpts.period ?? defaultProductionPeriod;
  const subSkillBonuses = subSkillBonusOverride ?? rateOpts
    .map(({opts}) => opts.subSkillBonus)
    .filter(isNotNullish);

  const helpingBonusEffect = getPokemonProducingRateHelpingBonusEffect({
    subSkillBonuses,
    calcBehavior,
  });

  // First pass calculates base production without factoring in any skill by other Pokémon
  const firstPassRates = getPokemonProductionFirstPassRates({
    helpingBonusEffect,
    subSkillBonuses,
    rateOpts,
    sharedOpts,
  });

  const firstPassRatesPostIngredient = getPokemonProductionPostIngredientMultiplier({
    groupingState,
    rates: firstPassRates,
    ingredientMultiplierOpts: {
      period,
      ingredientMap,
      recipeLevelData,
      calculatedCookingConfig,
    },
  });

  // Final calculation factors in any skill triggered by other Pokémon
  const finalRates = getPokemonProducingRateFinal({
    firstPassRatesPostIngredient,
    targetCount: calcBehavior?.asSingle ? maxTeamMemberCount : rateOpts.length,
  });

  return {
    rates: finalRates,
    grouped: groupPokemonProducingRate({
      period,
      rates: firstPassRatesPostIngredient.map(({atStage}) => atStage.final),
      state: groupingState,
    }),
  };
};
