import {defaultNeutralOpts, defaultProducingParams} from '@/const/game/production/defaults';
import {defaultSeedUsage} from '@/const/game/seed';
import {PokemonId, PokemonInfo} from '@/types/game/pokemon';
import {PokemonIndividualParams} from '@/types/game/pokemon/params';
import {PokemonProducingParams, PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {GroupedSubSkillBonus, SubSkillMap} from '@/types/game/pokemon/subSkill';
import {
  ProductionImplicitParams,
  ProductionIndividualParams,
  ProductionSingleParams,
} from '@/types/game/producing/rate/params';
import {getEvolutionCountFromPokemonInfo} from '@/utils/game/pokemon/evolution/count';
import {getSubSkillBonus, getSubSkillBonusValue} from '@/utils/game/subSkill/effect';


type GetHelpingBonusStackOpts = {
  subSkillBonus: GroupedSubSkillBonus,
};

export const getHelpingBonusStack = ({
  subSkillBonus,
}: GetHelpingBonusStackOpts) => {
  const helpingBonusCount = getSubSkillBonusValue(subSkillBonus, 'helper').length;

  if (!helpingBonusCount) {
    return 0;
  }

  return helpingBonusCount;
};

type GetProductionNeutralParamsOpts = {
  pokemon: PokemonInfo,
};

export const getProductionNeutralParams = ({
  pokemon,
}: GetProductionNeutralParamsOpts): ProductionSingleParams & ProductionImplicitParams => {
  return {
    ...defaultNeutralOpts,
    seeds: defaultSeedUsage,
    evolutionCount: getEvolutionCountFromPokemonInfo({pokemon}),
  };
};

type GetProductionIndividualParamsOpts = {
  input: PokemonIndividualParams & Partial<ProductionImplicitParams>,
  pokemon: PokemonInfo,
  subSkillMap: SubSkillMap,
  overrideLevel?: number,
};

export const getProductionIndividualParams = ({
  input,
  pokemon,
  subSkillMap,
  overrideLevel,
}: GetProductionIndividualParamsOpts): ProductionIndividualParams => {
  const {subSkill, nature} = input;

  const level = overrideLevel ?? input.level;

  return {
    level,
    seeds: input.seeds ?? defaultSeedUsage,
    evolutionCount: input.evolutionCount ?? getEvolutionCountFromPokemonInfo({pokemon}),
    subSkillBonus: getSubSkillBonus({level, pokemonSubSkill: subSkill, subSkillMap}),
    natureId: nature,
  };
};

type GetPokemonProducingParamsOpts = {
  pokemonId: PokemonId,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
};

export const getPokemonProducingParams = ({
  pokemonId,
  pokemonProducingParamsMap,
}: GetPokemonProducingParamsOpts): PokemonProducingParams => {
  return pokemonProducingParamsMap[pokemonId] ?? {pokemonId, ...defaultProducingParams};
};
