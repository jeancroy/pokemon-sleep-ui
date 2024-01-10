import React from 'react';

import {useTranslations} from 'next-intl';

import {InfoIcon} from '@/components/icons/info';
import {Flex} from '@/components/layout/flex/common';
import {MealImage} from '@/components/shared/meal/image';
import {IngredientIconsFromMeal} from '@/components/shared/meal/ingredients/iconsFromMeal';
import {Meal} from '@/types/game/meal/main';
import {getMealIngredientCount} from '@/utils/game/meal/count';


type Props = {
  targets: Meal[],
};

export const MealCoverageTargetComboMealInfo = ({targets}: Props) => {
  const t = useTranslations('Game.Food');

  return (
    <Flex className="info-highlight-inner gap-1 p-1.5 xl:flex-row">
      {targets
        .map((meal) => ({
          meal,
          ingredientCount: getMealIngredientCount(meal),
        }))
        .sort((a, b) => b.ingredientCount - a.ingredientCount)
        .map(({meal, ingredientCount}) => (
          <Flex key={meal.id} center direction="row" className="gap-1">
            <MealImage mealId={meal.id} dimension="h-12 w-12" className="opacity-40"/>
            <InfoIcon>
              {ingredientCount}
            </InfoIcon>
            <Flex center noFullWidth>
              <span className="text-sm">{t(meal.id.toString())}</span>
              <IngredientIconsFromMeal meal={meal}/>
            </Flex>
          </Flex>
        ))}
    </Flex>
  );
};
