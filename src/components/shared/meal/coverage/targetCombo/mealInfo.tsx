import React from 'react';

import {useTranslations} from 'next-intl';

import {InfoIcon} from '@/components/icons/info';
import {Flex} from '@/components/layout/flex/common';
import {MealCoverageComboData} from '@/components/shared/meal/coverage/targetCombo/type';
import {MealImage} from '@/components/shared/meal/image';
import {IngredientIconsFromMeal} from '@/components/shared/meal/ingredients/iconsFromMeal';


type Props = {
  data: MealCoverageComboData,
};

export const MealCoverageTargetComboMealInfo = ({data}: Props) => {
  const {meals, mealIngredientCounts} = data;

  const t = useTranslations('Game.Food');

  return (
    <Flex className="info-highlight-inner gap-1 p-1.5 xl:flex-row">
      {meals
        .sort((a, b) => mealIngredientCounts.byMeal[b.id] - mealIngredientCounts.byMeal[a.id])
        .map((meal) => (
          <Flex key={meal.id} center direction="row" className="gap-1">
            <MealImage mealId={meal.id} dimension="h-12 w-12" className="opacity-40"/>
            <InfoIcon>
              {mealIngredientCounts.byMeal[meal.id]}
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
