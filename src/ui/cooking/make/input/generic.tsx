import React from 'react';

import {MealFilterLevelAgnostic} from '@/components/shared/meal/filter/levelAgnostic/main';
import {MealMakerCommonProps} from '@/ui/cooking/make/type';


export const MealMakerInputGeneral = ({
  filter,
  setFilter,
  meals,
  ingredientMap,
}: MealMakerCommonProps) => {
  return (
    <MealFilterLevelAgnostic
      filter={filter}
      setFilter={setFilter}
      meals={meals}
      ingredientMap={ingredientMap}
    />
  );
};
