import React from 'react';

import {InfoIcon} from '@/components/icons/info';
import {Flex} from '@/components/layout/flex/common';
import {IngredientIconsFromMeal} from '@/components/shared/ingredient/icons/fromMeal';
import {IngredientIcons} from '@/components/shared/ingredient/icons/main';
import {MealMakerRecipePartsProps} from '@/ui/cooking/make/recipe/parts/type';


type Props = MealMakerRecipePartsProps;

export const MealMakerRecipeIngredients = ({
  meal,
  ingredientsMissing,
  ingredientSetReady,
  isInventoryUnset,
}: Props) => {
  return (
    <Flex direction="row" className="h-9 items-end gap-0.5">
      <InfoIcon>
        {meal.ingredientCount}
      </InfoIcon>
      <Flex noFullWidth>
        <IngredientIcons
          ingredients={[ingredientsMissing]}
          getMark={() => 'red'}
          noLink
        />
        <IngredientIconsFromMeal
          meal={meal}
          getMark={(ingredient) => (
            !isInventoryUnset && ingredientSetReady[ingredient.id] < 1 && 'red'
          )}
          noLink
        />
      </Flex>
    </Flex>
  );
};
