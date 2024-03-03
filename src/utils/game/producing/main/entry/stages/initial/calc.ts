import {PokemonProductionInitial} from '@/types/game/producing/rate/main';
import {StaminaSkillTriggerOverride} from '@/types/game/stamina/skill';
import {
  GetPokemonProductionInitialRateCommonOpts,
} from '@/utils/game/producing/main/entry/stages/initial/type';
import {PokemonProductionInCalcWithPayload} from '@/utils/game/producing/main/entry/stages/type';
import {getPokemonProductionInitial} from '@/utils/game/producing/main/unit/main';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {Nullable} from '@/utils/type';
import {toCalculatedUserConfig} from '@/utils/user/config/user/main';


type GetPokemonProductionInitialRatesOpts<TPayload> = GetPokemonProductionInitialRateCommonOpts<TPayload> & {
  skillTriggerOverrides: Nullable<StaminaSkillTriggerOverride[]>,
};

export const getPokemonProductionInitialCalculated = <TPayload>({
  helpingBonusEffect,
  subSkillBonuses,
  rateOpts,
  sharedOpts,
  skillTriggerOverrides,
}: GetPokemonProductionInitialRatesOpts<TPayload>): PokemonProductionInCalcWithPayload<
  PokemonProductionInitial,
  TPayload
>[] => {
  const {
    eventStrengthMultiplierData,
    cookingRecoveryData,
    bundle,
    snorlaxFavorite,
  } = sharedOpts;

  return rateOpts.map(({opts, payload}, rateIdx) => {
    const {individual, alwaysFullPack} = opts;

    const calculatedUserConfig = toCalculatedUserConfig({
      ...bundle,
      cookingRecoveryData,
      eventStrengthMultiplierData,
      snorlaxFavorite,
      recoveryRate: toRecoveryRate({natureId: individual.natureId, subSkillBonuses}),
      // Explicit `null` indicates no skill triggers
      skillTriggerOverride: skillTriggerOverrides?.at(rateIdx) ?? null,
      behaviorOverride: alwaysFullPack != null ? {alwaysFullPack: alwaysFullPack ? 'always' : 'disable'} : {},
    });

    return {
      rate: getPokemonProductionInitial({
        ...opts,
        ...sharedOpts,
        helpingBonusEffect,
        calculatedUserConfig,
      }),
      payload,
      calculatedUserConfig,
    };
  });
};
