import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {MealImage} from '@/components/shared/meal/image';
import {mealTypeDotStyle} from '@/styles/game/mealType';
import {MealMap} from '@/types/game/meal/main';
import {CookingConfig} from '@/types/userData/config/cooking/main';
import {toTargetMeals} from '@/utils/user/config/cooking/targetMeals';


type Props = {
  config: CookingConfig,
  mealMap: MealMap,
};

export const CookingConfigBrief = ({config, mealMap}: Props) => {
  const {mealType, target, recipeLevel} = config;

  if (!mealType) {
    return null;
  }

  const targetMeals = toTargetMeals({mealType, target, mealMap});

  return (
    <Flex direction="row" noFullWidth className="items-center gap-1">
      <div className={clsx('size-4 shrink-0 rounded-full', mealTypeDotStyle[mealType])}/>
      {targetMeals.map((meal, idx) => (
        <Flex key={idx} direction="row" noFullWidth className="items-center gap-1">
          <MealImage mealId={meal.id} dimension="size-6"/>
          <span>{recipeLevel[meal.id] ?? 1}</span>
        </Flex>
      ))}
    </Flex>
  );
};
