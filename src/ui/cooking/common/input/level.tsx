import React from 'react';

import {FilterWithUpdaterProps} from '@/components/input/filter/type';
import {RecipeLevelInput} from '@/components/shared/meal/recipeLevel/input/main';
import {RecipeLevelInputCommonProps} from '@/components/shared/meal/recipeLevel/type';
import {Meal} from '@/types/game/meal/main';
import {CookingCommonFilter} from '@/ui/cooking/common/type';


type Props<TFilter extends CookingCommonFilter> = FilterWithUpdaterProps<TFilter> & RecipeLevelInputCommonProps & {
  meal: Meal,
};

export const CookingInputRecipeLevel = <TFilter extends CookingCommonFilter>({
  filter,
  setFilter,
  meal,
  ...props
}: Props<TFilter>) => {
  const {recipeLevel} = filter;
  const {id} = meal;

  return (
    <RecipeLevelInput
      level={recipeLevel[id] ?? 1}
      onUpdate={(level) => setFilter((original) => ({
        ...original,
        recipeLevel: {
          ...original.recipeLevel,
          [id]: level,
        },
      } satisfies CookingCommonFilter))}
      {...props}
    />
  );
};
