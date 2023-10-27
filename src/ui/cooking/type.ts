import React from 'react';

import {FilterInclusionMap, FilterWithUpdaterProps} from '@/components/input/filter/type';
import {IngredientId, IngredientMap} from '@/types/game/ingredient';
import {Meal, MealId, MealInfo, MealTypeId} from '@/types/game/meal';
import {Dimension} from '@/types/style';
import {UserPreloadedData} from '@/types/userData/main';


export type CookingRecipeData = {
  meal: Meal,
  info: MealInfo,
};

export type CookingFilterRecipeLevel = {[id in MealId]?: number};

export type CookingFilterIngredientCount = {[ingredient in IngredientId]?: number | null};

export type CookingFilter = {
  type: MealTypeId,
  recipeLevel: CookingFilterRecipeLevel,
  capacity: number,
  ingredient: FilterInclusionMap<IngredientId>,
  ingredientCount: CookingFilterIngredientCount,
  showUnmakeableRecipe: boolean,
};

export type CookingCommonProps = FilterWithUpdaterProps<CookingFilter> & {
  meals: Meal[],
  mealTypes: MealTypeId[],
  ingredientMap: IngredientMap,
  preloaded: UserPreloadedData['cooking'],
};

export type CookingRecipeLayoutProps = {
  imageDimension: Dimension,
  clickable: boolean,
  mealId: number,
  icon?: React.ReactNode,
  markGray?: boolean,
};
