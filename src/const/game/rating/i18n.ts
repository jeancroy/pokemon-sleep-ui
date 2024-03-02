import {RatingBasis, RatingWeightedStatsBasis} from '@/types/game/pokemon/rating/config';
import {RatingResultCategory} from '@/types/game/pokemon/rating/result';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';


export const ratingBasisNameI18nId: {
  [basis in RatingBasis]: I18nMessageKeysOfNamespace<'UI.Rating.Basis'>
} = {
  totalStrength: 'TotalStrength.Name',
  ingredientProduction: 'IngredientStrength.Name',
  mealCoverage: 'MealCoverage.Name',
  mainSkillTriggerCount: 'MainSkillTriggerCount.Name',
};

export const ratingBasisExplainerI18nId: {
  [basis in RatingBasis]: I18nMessageKeysOfNamespace<'UI.Rating.Basis'>
} = {
  totalStrength: 'TotalStrength.Explainer',
  ingredientProduction: 'IngredientStrength.Explainer',
  mealCoverage: 'MealCoverage.Explainer',
  mainSkillTriggerCount: 'MainSkillTriggerCount.Explainer',
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
  intraSameIngredient: 'Category.IntraSpeciesSameIngredient',
};
