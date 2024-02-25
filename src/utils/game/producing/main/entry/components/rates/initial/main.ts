import {ProductionCalcBehavior} from '@/types/game/producing/behavior/type';
import {PokemonProductionInitial} from '@/types/game/producing/rate/main';
import {
  getPokemonProductionInitialCalculated,
} from '@/utils/game/producing/main/entry/components/rates/initial/calc';
import {
  GetPokemonProductionInitialRateCommonOpts,
} from '@/utils/game/producing/main/entry/components/rates/initial/type';
import {PokemonProductionInCalcWithPayload} from '@/utils/game/producing/main/entry/components/rates/type';
import {getPokemonSkillRecoveryFromProduction} from '@/utils/game/producing/skill/skillRecovery';


type GetPokemonProductionInitialRatesOpts<TPayload> = GetPokemonProductionInitialRateCommonOpts<TPayload> & {
  calcBehavior: ProductionCalcBehavior,
};

export const getPokemonProductionInitialRates = <TPayload>({
  helpingBonusEffect,
  subSkillBonuses,
  rateOpts,
  sharedOpts,
  calcBehavior,
}: GetPokemonProductionInitialRatesOpts<TPayload>): PokemonProductionInCalcWithPayload<
  PokemonProductionInitial,
  TPayload
>[] => {
  const initialRates = getPokemonProductionInitialCalculated({
    helpingBonusEffect,
    subSkillBonuses,
    rateOpts,
    sharedOpts,
    // Explicit `null` indicates no skill triggers
    skillTriggerOverrides: null,
  });

  return getPokemonProductionInitialCalculated({
    helpingBonusEffect,
    subSkillBonuses,
    rateOpts,
    sharedOpts,
    skillTriggerOverrides: getPokemonSkillRecoveryFromProduction({
      rates: initialRates.map(({rate}) => rate),
      calcBehavior,
    }),
  });
};
