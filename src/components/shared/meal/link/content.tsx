import React from 'react';

import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Flex} from '@/components/layout/flex/common';
import {IngredientIconsFromMeal} from '@/components/shared/ingredient/icons/fromMeal';
import {MealLinkStats} from '@/components/shared/meal/link/stats';
import {MealLinkCommonProps} from '@/components/shared/meal/link/type';


export const MealLinkContent = ({mealDetails, showStats}: MealLinkCommonProps) => {
  const {meal, strengthInfo} = mealDetails;

  return (
    <Flex direction="row" className="items-end gap-0.5 text-xs">
      <Flex noFullWidth center className="info-icon-normal text-shadow-preset size-6">
        {meal.ingredientCount}
      </Flex>
      <Flex noFullWidth className="gap-0.5">
        <AnimatedCollapse appear show={showStats}>
          <MealLinkStats strengthInfo={strengthInfo}/>
        </AnimatedCollapse>
        <IngredientIconsFromMeal meal={meal} noLink useTextShadow/>
      </Flex>
    </Flex>
  );
};
