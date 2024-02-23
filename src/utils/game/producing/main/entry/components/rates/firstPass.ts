import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {HelpingBonusEffect} from '@/types/game/producing/helpingBonus';
import {PokemonProductionFirstPass} from '@/types/game/producing/rate/main';
import {PokemonProductionInCalcWithPayload} from '@/utils/game/producing/main/entry/components/rates/type';
import {
  GetPokemonProductionUnitOptsWithPayload,
  GetPokemonProductionSharedOpts,
} from '@/utils/game/producing/main/type';
import {getPokemonProductionFirstPass} from '@/utils/game/producing/main/unit/main';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {toCalculatedUserConfig} from '@/utils/user/config/user/main';


type GetPokemonProductionFirstPassRatesOpts<TPayload> = {
  helpingBonusEffect: HelpingBonusEffect,
  subSkillBonuses: GroupedSubSkillBonus[],
  rateOpts: GetPokemonProductionUnitOptsWithPayload<TPayload>[],
  sharedOpts: GetPokemonProductionSharedOpts,
};

export const getPokemonProductionFirstPassRates = <TPayload>({
  helpingBonusEffect,
  subSkillBonuses,
  rateOpts,
  sharedOpts,
}: GetPokemonProductionFirstPassRatesOpts<TPayload>): PokemonProductionInCalcWithPayload<
  PokemonProductionFirstPass,
  TPayload
>[] => {
  const {
    eventStrengthMultiplierData,
    cookingRecoveryData,
    bundle,
    snorlaxFavorite,
  } = sharedOpts;

  return rateOpts.map(({opts, payload}) => {
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
      rate: getPokemonProductionFirstPass({
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
