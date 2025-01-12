import {PokemonId} from '@/types/game/pokemon';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {PokemonKeyLevel} from '@/types/game/pokemon/level';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonSubSkill} from '@/types/game/pokemon/subSkill';


export type RatingCombination = {
  pokemonId: PokemonId,
  ingredients: IngredientProduction[],
  subSkill: PokemonSubSkill,
  nature: NatureId | null,
};

export type RatingDataPoint = {
  value: number,
  combination: RatingCombination,
};

export type RatingExtrema = {
  value: number,
  combinations: RatingCombination[],
};

export const ratingResultCategory = [
  'intra',
  'intraSameIngredient',
  'cross',
] as const;

export type RatingResultCategory = typeof ratingResultCategory[number];

export type RatingResultOfCategoryAtLevel = {
  samples: number,
  rank: number,
  percentage: number,
  percentile: number,
  baseDiffPercent: number,
  extrema: null | {
    min: RatingExtrema,
    current: RatingExtrema,
    max: RatingExtrema,
  },
};

export type RatingResultOfLevel = {
  level: PokemonKeyLevel | number,
  result: {[category in RatingResultCategory]: RatingResultOfCategoryAtLevel},
};
