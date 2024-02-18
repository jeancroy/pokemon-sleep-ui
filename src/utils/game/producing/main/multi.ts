import {defaultProductionPeriod} from '@/const/game/production/defaults';
import {IngredientMap} from '@/types/game/ingredient';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {HelpingBonusEffect} from '@/types/game/producing/helpingBonus';
import {PokemonProducingRateFinal, PokemonProducingRateWithPayload} from '@/types/game/producing/rate';
import {ProducingStateOfRate} from '@/types/game/producing/state';
import {CookingUserSettings} from '@/types/userData/settings/cooking';
import {toSum} from '@/utils/array';
import {applyIngredientMultiplier} from '@/utils/game/producing/apply/ingredient';
import {groupPokemonProducingRate} from '@/utils/game/producing/group';
import {getIngredientMultiplier} from '@/utils/game/producing/ingredient/multiplier';
import {getPokemonProducingRateBase} from '@/utils/game/producing/main/base';
import {GetPokemonProducingRateOptsWithPayload} from '@/utils/game/producing/main/type';
import {getHelpingBonusStack} from '@/utils/game/producing/params';
import {GetProducingRateSharedOpts} from '@/utils/game/producing/type';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {isNotNullish} from '@/utils/type';
import {toCalculatedUserSettings} from '@/utils/user/settings/calculated';


export type GetPokemonProducingRateMultiOpts<TPayload> = {
  ingredientMap: IngredientMap,
  recipeLevelData: RecipeLevelData[],
  rateOpts: GetPokemonProducingRateOptsWithPayload<TPayload>[],
  sharedOpts: GetProducingRateSharedOpts,
  groupingState: ProducingStateOfRate,
  cookingSettings: CookingUserSettings,
};

export const getPokemonProducingRateMulti = <TPayload>({
  ingredientMap,
  recipeLevelData,
  rateOpts,
  sharedOpts,
  groupingState,
  cookingSettings,
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

    const calculatedSettings = toCalculatedUserSettings({
      ...bundle,
      recoveryRate: toRecoveryRate({natureId, subSkillBonuses}),
      behaviorOverride: alwaysFullPack != null ? {alwaysFullPack: alwaysFullPack ? 'always' : 'disable'} : {},
      cookingRecoveryData,
      eventStrengthMultiplierData,
      snorlaxFavorite,
    });

    return {
      rawRate: getPokemonProducingRateBase({
        ...opts,
        ...sharedOpts,
        helpingBonusEffect,
        calculatedSettings,
      }),
      payload,
      calculatedSettings,
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

        return [id, rate.quantity];
      })
      .filter(isNotNullish)),
    period,
    cookingSettings,
  });

  const ratesAfterIngredient: PokemonProducingRateWithPayload<TPayload>[] = ratesWithPayload.map((rateWithPayload) => {
    const {rawRate, calculatedSettings, payload} = rateWithPayload;

    return {
      payload,
      calculatedSettings,
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
