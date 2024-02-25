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
    skillRecoveryOverrides: calcBehavior.asSingle ? null : rateOpts.map(() => []),
  });

  // If evaluated as single, skill recovery from the team should be ignored as each "team" only have 1 member (self)
  if (calcBehavior.asSingle) {
    return initialRates;
  }

  return getPokemonProductionInitialCalculated({
    helpingBonusEffect,
    subSkillBonuses,
    rateOpts,
    sharedOpts,
    skillRecoveryOverrides: getPokemonSkillRecoveryFromProduction({
      rates: initialRates.map(({rate}) => rate),
    }),
  });
};
