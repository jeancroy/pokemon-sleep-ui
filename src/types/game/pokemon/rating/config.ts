import {PokemonKeyLevel} from '@/types/game/pokemon/level';
import {RatingResultCategory} from '@/types/game/pokemon/rating/result';
import {Migratable} from '@/types/migrate';


export const ratingBasis = [
  'totalStrength',
  'ingredientProduction',
  'mealCoverage',
  'mainSkillTriggerCount',
] as const;

export type RatingBasis = typeof ratingBasis[number];

export type RatingWeight = {[keyLevel in PokemonKeyLevel]?: number};

export const ratingWeightedStatsBasis = [
  'percentile',
  'percentage',
  'relativeStrength',
] as const;

export type RatingWeightedStatsBasis = typeof ratingWeightedStatsBasis[number];

export type RatingWeightedStats = {[basis in RatingWeightedStatsBasis]: number};

export type RatingConfig = Migratable & {
  basis: RatingWeightedStatsBasis,
  weight: RatingWeight,
  category: RatingResultCategory,
};
