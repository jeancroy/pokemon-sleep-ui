import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {MealContentIngredientSection} from '@/ui/meal/page/content/production/single';
import {MealPageContentCommonProps} from '@/ui/meal/page/content/type';
import {MealCommonProps} from '@/ui/meal/page/type';
import {getIngredientLevel} from '@/utils/game/ingredient';


type Props = MealCommonProps & MealPageContentCommonProps;

export const MealContentIngredientProduction = ({input, ...props}: Props) => {
  const {
    meal,
    pokemonIngredientProductionMap,
  } = props;

  const {level} = input;
  const ingredientLevel = React.useMemo(() => getIngredientLevel(level), [level]);

  return (
    <Flex className="gap-1.5">
      {meal.ingredients.map((ingredient) => (
        <MealContentIngredientSection
          key={ingredient.id}
          ingredient={ingredient}
          input={input}
          ingredientProductionMapOfLevel={pokemonIngredientProductionMap[ingredientLevel]}
          {...props}
        />
      ))}
    </Flex>
  );
};
