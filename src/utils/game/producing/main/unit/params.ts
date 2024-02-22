import {defaultProductionPeriod} from '@/const/game/production/defaults';
import {PokemonProducingRateIntermediateParams} from '@/types/game/producing/rate/params';
import {getMainSkillActiveEffect} from '@/utils/game/mainSkill/activeEffect/main';
import {getMainSkillLevel} from '@/utils/game/mainSkill/level';
import {getSkillTriggerRatePercent} from '@/utils/game/mainSkill/rate';
import {getBaseFrequencyFromPokemon} from '@/utils/game/producing/frequency';
import {getCarryLimitInfo} from '@/utils/game/producing/inventory/carryLimit';
import {GetPokemonProducingRateUnitOpts} from '@/utils/game/producing/main/unit/type';
import {getProduceSplit} from '@/utils/game/producing/split';
import {isFullPackEffective} from '@/utils/user/config/user/fullPack';


export const getPokemonProducingRateIntermediateParams = ({
  seeds,
  evolutionCount,
  calculatedUserConfig,
  period,
  skillData,
  ...opts
}: GetPokemonProducingRateUnitOpts): PokemonProducingRateIntermediateParams => {
  const {
    pokemon,
    pokemonProducingParams,
    natureId,
  } = opts;
  const {behavior} = calculatedUserConfig.origin;

  const subSkillBonus = opts.subSkillBonus ?? {};

  const isFullPack = isFullPackEffective({
    fullPackBehavior: behavior.alwaysFullPack,
    specialty: pokemon.specialty,
  });

  return {
    isFullPack,
    period: period ?? defaultProductionPeriod,
    frequency: getBaseFrequencyFromPokemon({
      ...opts,
      behavior,
      subSkillBonus,
    }),
    carryLimitInfo: getCarryLimitInfo({
      pokemon,
      evolutionCount,
      subSkillBonus,
      behavior,
    }),
    produceSplit: getProduceSplit({
      isFullPack,
      ...opts,
    }),
    skillRatePercent: getSkillTriggerRatePercent({
      baseSkillRatePercent: behavior.includeMainSkill ? pokemonProducingParams.skillPercent : 0,
      subSkillBonus,
      natureId,
    }),
    activeSkillEffect: getMainSkillActiveEffect({
      skillLevel: getMainSkillLevel({
        seedsUsed: seeds.gold,
        evolutionCount,
        subSkillBonus,
      }),
      skillData,
    }),
  };
};
