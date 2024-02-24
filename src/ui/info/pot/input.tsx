import React from 'react';

import {FilterWithUpdaterProps} from '@/components/input/filter/type';
import {getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {PotCapacityInput} from '@/components/shared/input/potCapacity';
import {MealFilter} from '@/components/shared/meal/filter/main';
import {IngredientMap} from '@/types/game/ingredient';
import {Meal} from '@/types/game/meal/main';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {PotInfo} from '@/types/game/potInfo';
import {PotInfoFilter} from '@/ui/info/pot/type';
import {getMaxRecipeLevel} from '@/utils/game/meal/recipeLevel';


type Props = FilterWithUpdaterProps<PotInfoFilter> & {
  ingredientMap: IngredientMap,
  potInfoList: PotInfo[],
  recipeLevelData: RecipeLevelData[],
  meals: Meal[],
};

export const PotInfoInput = ({
  filter,
  setFilter,
  ingredientMap,
  potInfoList,
  recipeLevelData,
  meals,
}: Props) => {
  return (
    <>
      <PotCapacityInput
        potInfoList={potInfoList}
        {...getSingleSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'capacity',
          allowNull: false,
        })}
      />
      <MealFilter
        filter={filter}
        setFilter={setFilter}
        meals={meals}
        ingredientMap={ingredientMap}
        maxRecipeLevel={getMaxRecipeLevel({recipeLevelData})}
      />
    </>
  );
};
