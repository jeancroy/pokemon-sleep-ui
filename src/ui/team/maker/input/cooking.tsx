import React from 'react';

import {getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {IngredientInventoryInput} from '@/components/shared/input/ingredient/inventory';
import {MealTypeInput} from '@/components/shared/input/mealType';
import {PotCapacityInput} from '@/components/shared/input/potCapacity';
import {MealPlanner} from '@/components/shared/meal/planner/main';
import {usePossibleMealTypes} from '@/hooks/meal/mealTypes';
import {TeamMakerInputCommonProps} from '@/ui/team/maker/input/type';
import {TeamMakerInput} from '@/ui/team/maker/type/input';
import {cloneMerge} from '@/utils/object/cloneMerge';
import {isNotNullish} from '@/utils/type';


export const TeamMakerInputCooking = ({
  ingredientMap,
  mealMap,
  maxRecipeLevel,
  input,
  setInput,
}: TeamMakerInputCommonProps) => {
  const {
    target,
    recipeLevel,
    ingredientCount,
  } = input;

  const mealTypes = usePossibleMealTypes(Object.values(mealMap).filter(isNotNullish));

  return (
    <>
      <MealTypeInput
        mealTypes={mealTypes}
        filter={input}
        setFilter={setInput}
        filterKey="mealType"
      />
      <PotCapacityInput
        {...getSingleSelectOnClickProps({
          filter: input,
          setFilter: setInput,
          filterKey: 'potCapacity',
          allowNull: false,
        })}
      />
      <MealPlanner
        target={target}
        setTarget={(updated) => setInput(({target, ...original}) => ({
          ...original,
          target: cloneMerge(target, updated),
        }))}
        recipeLevel={recipeLevel}
        setRecipeLevel={(updated) => setInput(({recipeLevel, ...original}) => ({
          ...original,
          recipeLevel: cloneMerge(recipeLevel, updated),
        }))}
        mealMap={mealMap}
        mealTypes={mealTypes}
        maxRecipeLevel={maxRecipeLevel}
      />
      <IngredientInventoryInput
        ingredientMap={ingredientMap}
        counter={ingredientCount}
        showIngredient={() => true}
        onValueChanged={({id}, count) => setInput(({ingredientCount, ...original}) => ({
          ...original,
          ingredientCount: {
            ...ingredientCount,
            [id]: count,
          },
        } satisfies TeamMakerInput))}
        onReset={() => setInput(({ingredientCount, ...original}) => ({
          ...original,
          ingredientCount: {},
        } satisfies TeamMakerInput))}
      />
    </>
  );
};
