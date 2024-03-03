import {specialtyIdMap} from '@/const/game/pokemon';
import {PokemonSpecialtyId} from '@/types/game/pokemon';
import {PokemonKeyLevel} from '@/types/game/pokemon/level';
import {RatingBasis, RatingConfig, RatingWeight} from '@/types/game/pokemon/rating/config';
import {RatingResultOfCategoryAtLevel} from '@/types/game/pokemon/rating/result';
import {SpecialtyType} from '@/types/game/pokemon/specialty';
import {ratingConfigMigrators} from '@/utils/migrate/ratingConfig/migrators';


export const defaultRatingWeight: Required<RatingWeight> = {
  1: 0,
  10: 0,
  25: 0.75,
  30: 1,
  50: 1,
  60: 0.5,
  75: 0.25,
  100: 0.1,
  max: 0.5,
};

export const defaultRatingConfig: RatingConfig = {
  version: ratingConfigMigrators.length,
  basis: 'percentile',
  weight: defaultRatingWeight,
  category: 'intra',
};

export const initialRatingResultOfCategory: RatingResultOfCategoryAtLevel = {
  samples: NaN,
  rank: NaN,
  percentage: NaN,
  percentile: NaN,
  baseDiffPercent: NaN,
  extrema: null,
};

export const ratingBasisSpecialty: {[basis in RatingBasis]: PokemonSpecialtyId[]} = {
  totalStrength: [specialtyIdMap.berry, specialtyIdMap.ingredient],
  ingredientProduction: [specialtyIdMap.ingredient],
  mealCoverage: [specialtyIdMap.ingredient],
  mainSkillTriggerCount: [specialtyIdMap.skill],
};

export const defaultRatingBasisOfSpecialty: {[specialty in SpecialtyType]: RatingBasis} = {
  berry: 'totalStrength',
  ingredient: 'ingredientProduction',
  skill: 'mainSkillTriggerCount',
};

export const defaultMaxRatingLevel: PokemonKeyLevel = 'max';
