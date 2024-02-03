import React from 'react';

import {clsx} from 'clsx';

import {Grid} from '@/components/layout/grid';
import {PopupCommon} from '@/components/popup/common/main';
import {MealSelectorOption} from '@/components/shared/meal/selector/option';
import {MealSelectorLevelUpdatingProps} from '@/components/shared/meal/selector/type';
import {Meal, MealId, MealMap} from '@/types/game/meal/main';
import {getMealIngredientCount} from '@/utils/game/meal/count';
import {isNotNullish} from '@/utils/type';


type Props = MealSelectorLevelUpdatingProps & {
  current: MealId | null | undefined,
  mealMap: MealMap,
  isMealOption: (meal: Meal) => boolean,
  onSelect: (meal: Meal | null) => void,
};

export const MealSelector = ({
  mealType,
  // ^^^^ Intentionally extracted from `props` ^^^^
  current,
  mealMap,
  isMealOption,
  onSelect,
  ...props
}: Props) => {
  const {maxRecipeLevel} = props;
  const [show, setShow] = React.useState(false);

  return (
    <>
      <PopupCommon show={show} setShow={setShow}>
        <Grid className={clsx(
          'grid-cols-1 gap-2 xs:grid-cols-2 sm:w-[70vw] md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6',
        )}>
          {Object.values(mealMap)
            .filter(isNotNullish)
            .filter(isMealOption)
            .sort((a, b) => getMealIngredientCount(b) - getMealIngredientCount(a))
            .map((meal) => (
              <MealSelectorOption
                key={meal.id}
                meal={meal}
                mealType={meal.type}
                onClick={() => {
                  onSelect(meal);
                  setShow(false);
                }}
                {...props}
              />
            ))}
          <MealSelectorOption
            mealType={mealType}
            maxRecipeLevel={maxRecipeLevel}
            meal={undefined}
            onClick={() => {
              onSelect(null);
              setShow(false);
            }}
          />
        </Grid>
      </PopupCommon>
      <MealSelectorOption
        meal={current ? mealMap[current] : undefined}
        mealType={mealType}
        onClick={() => setShow(true)}
        {...props}
      />
    </>
  );
};
