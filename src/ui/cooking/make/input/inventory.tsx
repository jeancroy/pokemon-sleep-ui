import React from 'react';

import {IngredientInventoryInput} from '@/components/shared/input/ingredient/inventory';
import {MealMakerCommonProps, MealMakerFilter} from '@/ui/cooking/make/type';


export const MealMakerInputInventory = ({filter, setFilter, ingredientMap}: MealMakerCommonProps) => {
  return (
    <IngredientInventoryInput
      ingredientMap={ingredientMap}
      counter={filter.inventory}
      showIngredient={() => true}
      onValueChanged={({id}, count) => setFilter((original) => ({
        ...original,
        inventory: {
          ...original.inventory,
          [id]: count,
        },
      } satisfies MealMakerFilter))}
      onReset={() => setFilter(({inventory, ...original}) => ({
        ...original,
        inventory: {},
      } satisfies MealMakerFilter))}
    />
  );
};
