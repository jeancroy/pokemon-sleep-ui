import {ingredientLevels} from '@/types/game/pokemon/ingredient';
import {pokemonSubSkillLevel} from '@/types/game/pokemon/subSkill';


export const pokemonStaticNumericKeyLevels = [
  ...pokemonSubSkillLevel,
  ...ingredientLevels,
] as const;

export const pokemonKeyLevels = [
  ...pokemonStaticNumericKeyLevels,
  'max',
] as const;

export type PokemonKeyLevel = typeof pokemonKeyLevels[number];
