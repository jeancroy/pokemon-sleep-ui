import {defaultProductionPeriod} from '@/const/game/production/defaults';
import {getSkillTriggerRatePercent} from '@/utils/game/mainSkill/rate';
import {getBaseFrequencyFromPokemon} from '@/utils/game/producing/frequency';
import {getCarryLimitInfo} from '@/utils/game/producing/inventory/carryLimit';
import {GetPokemonProducingRateUnitOpts, PokemonProducingRateParams} from '@/utils/game/producing/main/unit/type';
import {getProduceSplit} from '@/utils/game/producing/split';
import {isFullPackEffective} from '@/utils/user/config/user/fullPack';


export const getPokemonProducingRateParams = ({
  evolutionCount,
  calculatedUserConfig,
  period,
  ...opts
}: GetPokemonProducingRateUnitOpts): PokemonProducingRateParams => {
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
    subSkillBonus,
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
  };
};
