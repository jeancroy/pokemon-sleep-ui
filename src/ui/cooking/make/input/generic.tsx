import React from 'react';

import {getMultiSelectOnClickProps, getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {IngredientSelectionInput} from '@/components/shared/input/ingredient/selection';
import {MealTypeInput} from '@/components/shared/input/mealType';
import {PotCapacityInput} from '@/components/shared/input/potCapacity';
import {MealMakerCommonProps} from '@/ui/cooking/make/type';


export const MealMakerInputGeneral = ({
  mealTypes,
  ingredientMap,
  potInfoList,
  filter,
  setFilter,
}: MealMakerCommonProps) => {
  return (
    <>
      <MealTypeInput
        mealTypes={mealTypes}
        filter={filter}
        setFilter={setFilter}
        filterKey="type"
      />
      <PotCapacityInput
        potInfoList={potInfoList}
        {...getSingleSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'capacity',
          allowNull: false,
        })}
      />
      <IngredientSelectionInput
        ingredientIds={Object.keys(ingredientMap).map((id) => Number(id))}
        {...getMultiSelectOnClickProps({
          filter: filter,
          setFilter: setFilter,
          filterKey: 'ingredient',
        })}
      />
    </>
  );
};
