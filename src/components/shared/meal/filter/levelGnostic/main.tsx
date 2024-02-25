import React from 'react';


import {InputRow} from '@/components/input/filter/row';
import {MealFilterLevelAgnostic} from '@/components/shared/meal/filter/levelAgnostic/main';
import {MealFilterAgnosticCommonProps} from '@/components/shared/meal/filter/levelAgnostic/type';
import {MealInputFilterLevelGnostic} from '@/components/shared/meal/filter/levelGnostic/type';
import {MealLevelInput} from '@/components/shared/meal/level';


type Props<TFilter extends MealInputFilterLevelGnostic> = MealFilterAgnosticCommonProps<TFilter> & {
  maxRecipeLevel: number,
};

export const MealFilterLevelGnostic = <TFilter extends MealInputFilterLevelGnostic>({
  maxRecipeLevel,
  ...props
}: Props<TFilter>) => {
  const {
    filter,
    setFilter,
  } = props;

  return (
    <MealFilterLevelAgnostic {...props}>
      <InputRow className="px-2 py-1">
        <MealLevelInput
          max={maxRecipeLevel}
          value={filter.recipeLevel}
          setValue={(recipeLevel) => setFilter((original) => ({
            ...original,
            recipeLevel,
          }))}
        />
      </InputRow>
    </MealFilterLevelAgnostic>
  );
};
