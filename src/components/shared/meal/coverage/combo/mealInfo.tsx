import React from 'react';

import {useTranslations} from 'next-intl';

import {InfoIcon} from '@/components/icons/info';
import {Flex} from '@/components/layout/flex/common';
import {IngredientIconsFromMeal} from '@/components/shared/ingredient/icons/fromMeal';
import {MealCoverageComboData} from '@/components/shared/meal/coverage/combo/type';
import {MealImage} from '@/components/shared/meal/image';
import {mealTypeTextStyle} from '@/styles/game/mealType';


type Props = {
  data: MealCoverageComboData,
};

export const MealCoverageComboMealInfo = ({data}: Props) => {
  const {meals, mealIngredientCounts} = data;

  const t = useTranslations('Game.Food');

  return (
    <Flex className="info-highlight-inner gap-1 p-1.5 xl:flex-row">
      {meals
        .sort((a, b) => mealIngredientCounts.byMeal[b.id] - mealIngredientCounts.byMeal[a.id])
        .map((meal, idx) => (
          <Flex key={`${meal.id}@${idx}`} center direction="row" className="gap-1">
            <MealImage mealId={meal.id} dimension="size-12" className="opacity-40"/>
            <InfoIcon>
              {mealIngredientCounts.byMeal[meal.id]}
            </InfoIcon>
            <Flex center noFullWidth>
              <span className="text-sm">{t(meal.id.toString())}</span>
              <IngredientIconsFromMeal meal={meal} className={mealTypeTextStyle[meal.type]}/>
            </Flex>
          </Flex>
        ))}
    </Flex>
  );
};
