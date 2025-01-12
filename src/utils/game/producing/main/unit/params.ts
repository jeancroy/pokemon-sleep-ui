import {defaultProductionPeriod} from '@/const/game/production/defaults';
import {PokemonProductionIntermediateParams} from '@/types/game/producing/rate/params';
import {getMainSkillActiveEffect} from '@/utils/game/mainSkill/activeEffect/main';
import {getMainSkillLevel} from '@/utils/game/mainSkill/level';
import {getSkillTriggerRatePercent} from '@/utils/game/mainSkill/rate';
import {getBaseFrequencyFromPokemon} from '@/utils/game/producing/frequency';
import {getCarryLimitInfo} from '@/utils/game/producing/inventory/carryLimit';
import {GetPokemonProductionUnitOpts} from '@/utils/game/producing/main/unit/type';
import {getProduceSplit} from '@/utils/game/producing/split';
import {isFullPackEffective} from '@/utils/user/config/user/fullPack';


export const getPokemonProductionIntermediateParams = ({
  individual,
  calculatedUserConfig,
  period,
  skillData,
  ...opts
}: GetPokemonProductionUnitOpts): PokemonProductionIntermediateParams => {
  const {
    pokemon,
    pokemonProducingParams,
    helpingBonusEffect,
  } = opts;
  const {
    level,
    seeds,
    evolutionCount,
    natureId,
  } = individual;
  const {behavior} = calculatedUserConfig.origin;

  const subSkillBonus = individual.subSkillBonus ?? {};

  const isFullPack = isFullPackEffective({
    fullPackBehavior: behavior.alwaysFullPack,
    specialty: pokemon.specialty,
  });

  return {
    isFullPack,
    period: period ?? defaultProductionPeriod,
    frequency: getBaseFrequencyFromPokemon({
      pokemon,
      level,
      natureId,
      subSkillBonus,
      helpingBonusEffect,
      behavior,
    }),
    carryLimitInfo: getCarryLimitInfo({
      pokemon,
      evolutionCount,
      subSkillBonus,
      behavior,
    }),
    produceSplit: getProduceSplit({
      pokemonProducingParams,
      natureId,
      subSkillBonus,
      isFullPack,
    }),
    skillTrigger: {
      ratePercent: getSkillTriggerRatePercent({
        baseSkillRatePercent: pokemonProducingParams.skillPercent,
        subSkillBonus,
        natureId,
      }),
    },
    activeSkillEffect: getMainSkillActiveEffect({
      skillLevel: getMainSkillLevel({
        seedsUsed: seeds.gold,
        evolutionCount,
        subSkillBonus,
        mainSkillData: skillData,
        mainSkillLevelOverride: individual.mainSkillLevelOverride,
      }),
      skillData,
    }),
  };
};
