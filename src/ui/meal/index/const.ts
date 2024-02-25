import {I18nMessageKeysOfNamespace} from '@/types/i18n';
import {MealIndexSortingBasis} from '@/ui/meal/index/type';


export const mealIndexSortingBasisI18nId: {
  [sort in MealIndexSortingBasis]: I18nMessageKeysOfNamespace<'UI.InPage.Cooking.Sort'>
} = {
  recipeBaseStrength: 'RecipeBaseStrength',
  ingredientCount: 'IngredientCount',
};

export const mealIndexSortingBasisIconSrc: {[sort in MealIndexSortingBasis]: string} = {
  recipeBaseStrength: '/images/generic/strengthWhite.png',
  ingredientCount: '/images/generic/ingredient.png',
};
