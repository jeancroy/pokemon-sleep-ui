import {PokemonProductionInitial} from '@/types/game/producing/rate/main';
import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {
  GetPokemonProductionInitialRateCommonOpts,
} from '@/utils/game/producing/main/entry/components/rates/initial/type';
import {PokemonProductionInCalcWithPayload} from '@/utils/game/producing/main/entry/components/rates/type';
import {getPokemonProductionInitial} from '@/utils/game/producing/main/unit/main';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {Nullable} from '@/utils/type';
import {toCalculatedUserConfig} from '@/utils/user/config/user/main';


type GetPokemonProductionInitialRatesOpts<TPayload> = GetPokemonProductionInitialRateCommonOpts<TPayload> & {
  skillRecoveryOverrides?: Nullable<StaminaSkillTriggerData[][]>,
};

export const getPokemonProductionInitialCalculated = <TPayload>({
  helpingBonusEffect,
  subSkillBonuses,
  rateOpts,
  sharedOpts,
  skillRecoveryOverrides,
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
    const {natureId, alwaysFullPack} = opts;

    const calculatedUserConfig = toCalculatedUserConfig({
      ...bundle,
      cookingRecoveryData,
      eventStrengthMultiplierData,
      snorlaxFavorite,
      recoveryRate: toRecoveryRate({natureId, subSkillBonuses}),
      skillRecoveryOverride: skillRecoveryOverrides?.at(rateIdx),
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
