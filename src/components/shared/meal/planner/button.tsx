import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {MealImage} from '@/components/shared/meal/image';
import {mealTypeTextStyle} from '@/styles/game/mealType';
import {RecipeLevel} from '@/types/game/cooking';
import {MealTypeId} from '@/types/game/meal/main';
import {userCookingMeals, UserCookingTarget} from '@/types/userData/cooking';


type Props = {
  target: UserCookingTarget,
  recipeLevel: RecipeLevel,
  mealTypes: MealTypeId[],
};

export const MealPlannerButton = ({target, recipeLevel, mealTypes}: Props) => {
  const t = useTranslations('Game');

  return (
    <Flex className="gap-2 p-0.5 text-sm xl:flex-row">
      {mealTypes.map((mealType) => {
        const mealsOfDay = target[mealType];

        return (
          <Flex key={mealType} center className={mealTypeTextStyle[mealType]}>
            {userCookingMeals.map((cookingMeal) => {
              const mealId = mealsOfDay ? mealsOfDay[cookingMeal] : undefined;

              if (!mealId) {
                return <XCircleIcon key={cookingMeal} className="size-5"/>;
              }

              return (
                <Flex key={cookingMeal} noFullWidth direction="row" className="items-center gap-1">
                  <MealImage mealId={mealId} dimension="size-5"/>
                  <span>{t(`Food.${mealId}`)} (Lv {recipeLevel[mealId] ?? 1})</span>
                </Flex>
              );
            })}
          </Flex>
        );
      })}
    </Flex>
  );
};
