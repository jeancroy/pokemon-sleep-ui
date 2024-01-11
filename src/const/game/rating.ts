import {specialtyIdMap} from '@/const/game/pokemon';
import {PokemonSpecialtyId} from '@/types/game/pokemon';
import {RatingBasis, RatingConfig, RatingWeight, RatingWeightedStatsBasis} from '@/types/game/pokemon/rating/config';
import {RatingResultCategory, RatingResultOfCategoryAtLevel} from '@/types/game/pokemon/rating/result';
import {SpecialtyType} from '@/types/game/pokemon/specialty';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';
import {ratingConfigMigrators} from '@/utils/migrate/ratingConfig/migrators';


export const defaultRatingWeight: RatingWeight = {
  1: 0,
  10: 0,
  25: 0.75,
  30: 1,
  50: 1,
  60: 0.5,
  75: 0.25,
  100: 0.1,
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
  totalProduction: [specialtyIdMap.berry, specialtyIdMap.ingredient],
  ingredientCount: [specialtyIdMap.ingredient],
  ingredientProduction: [specialtyIdMap.ingredient],
  skillTriggerValue: [specialtyIdMap.skill],
};

export const ratingBasisI18nId: {
  [basis in RatingBasis]: I18nMessageKeysOfNamespace<'UI.InPage.Pokedex'>
} = {
  totalProduction: 'Sort.TotalEnergy',
  ingredientCount: 'Sort.IngredientCount',
  ingredientProduction: 'Sort.IngredientEnergy',
  skillTriggerValue: 'Stats.MainSkillTriggerValue',
};

export const ratingWeightedStatsBasisI18nId: {
  [basis in RatingWeightedStatsBasis]: I18nMessageKeysOfNamespace<'UI.Rating'>
} = {
  percentage: 'WeightedStatsBasis.Percentage',
  percentile: 'WeightedStatsBasis.Percentile',
  relativeStrength: 'WeightedStatsBasis.RelativeStrength',
};

export const ratingResultCategoryI18nId: {
  [category in RatingResultCategory]: I18nMessageKeysOfNamespace<'UI.Rating'>
} = {
  cross: 'Category.CrossSpecies',
  intra: 'Category.IntraSpecies',
};

export const defaultRatingBasisOfSpecialty: {[specialty in SpecialtyType]: RatingBasis} = {
  berry: 'totalProduction',
  ingredient: 'ingredientProduction',
  skill: 'skillTriggerValue',
};
