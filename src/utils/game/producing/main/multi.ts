import {defaultProductionPeriod} from '@/const/game/production/defaults';
import {IngredientMap} from '@/types/game/ingredient';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {HelpingBonusEffect} from '@/types/game/producing/helpingBonus';
import {PokemonProducingRateFinal, PokemonProducingRateWithPayload} from '@/types/game/producing/rate/main';
import {ProducingStateCalculated} from '@/types/game/producing/state';
import {CalculatedCookingConfig} from '@/types/userData/config/cooking/main';
import {toSum} from '@/utils/array';
import {applyIngredientMultiplier} from '@/utils/game/producing/apply/ingredient';
import {groupPokemonProducingRate} from '@/utils/game/producing/group';
import {getIngredientMultiplier} from '@/utils/game/producing/ingredient/multiplier';
import {getPokemonProducingRateBase} from '@/utils/game/producing/main/base/main';
import {GetPokemonProducingRateOptsWithPayload, GetProducingRateSharedOpts} from '@/utils/game/producing/main/type';
import {getHelpingBonusStack} from '@/utils/game/producing/params';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {isNotNullish} from '@/utils/type';
import {toCalculatedUserConfig} from '@/utils/user/config/user/main';


export type GetPokemonProducingRateMultiOpts<TPayload> = {
  ingredientMap: IngredientMap,
  recipeLevelData: RecipeLevelData[],
  rateOpts: GetPokemonProducingRateOptsWithPayload<TPayload>[],
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
    eventStrengthMultiplierData,
    cookingRecoveryData,
    bundle,
    calcBehavior,
    snorlaxFavorite,
    subSkillBonusOverride,
  } = sharedOpts;

  const period = sharedOpts.period ?? defaultProductionPeriod;
  const subSkillBonuses = subSkillBonusOverride ?? rateOpts
    .map(({opts}) => opts.subSkillBonus)
    .filter(isNotNullish);

  const helpingBonusStacks = toSum(subSkillBonuses.map((subSkillBonus) => getHelpingBonusStack({subSkillBonus})));
  const helpingBonusEffect: HelpingBonusEffect = (
    calcBehavior?.asSingle ?
      {context: 'single', active: !!helpingBonusStacks} :
      {context: 'team', stack: helpingBonusStacks}
  );

  const ratesWithPayload = rateOpts.map(({opts, payload}) => {
    const {natureId, alwaysFullPack} = opts;

    const calculatedUserConfig = toCalculatedUserConfig({
      ...bundle,
      cookingRecoveryData,
      eventStrengthMultiplierData,
      snorlaxFavorite,
      recoveryRate: toRecoveryRate({natureId, subSkillBonuses}),
      behaviorOverride: alwaysFullPack != null ? {alwaysFullPack: alwaysFullPack ? 'always' : 'disable'} : {},
    });

    return {
      rawRate: getPokemonProducingRateBase({
        ...opts,
        ...sharedOpts,
        helpingBonusEffect,
        calculatedUserConfig,
      }),
      payload,
      calculatedUserConfig,
    };
  });
  const groupedOriginalRates = groupPokemonProducingRate({
    period,
    rates: ratesWithPayload.map(({rawRate}) => rawRate),
    state: groupingState,
  });
  const ingredientMultiplier = getIngredientMultiplier({
    ingredientMap,
    recipeLevelData,
    production: Object.fromEntries(Object.entries(groupedOriginalRates.ingredient)
      .map(([id, rate]) => {
        if (!rate) {
          return null;
        }

        return [id, rate.qty];
      })
      .filter(isNotNullish)),
    period,
    calculatedCookingConfig,
  });

  const ratesAfterIngredient: PokemonProducingRateWithPayload<TPayload>[] = ratesWithPayload.map((rateWithPayload) => {
    const {rawRate, calculatedUserConfig, payload} = rateWithPayload;

    return {
      payload,
      calculatedUserConfig,
      atStage: {
        original: rawRate,
        final: applyIngredientMultiplier({rate: rawRate, ingredientMultiplier}),
      },
    };
  });

  return {
    rates: ratesAfterIngredient,
    grouped: groupPokemonProducingRate({
      period,
      rates: ratesAfterIngredient.map(({atStage}) => atStage.final),
      state: groupingState,
    }),
  };
};
