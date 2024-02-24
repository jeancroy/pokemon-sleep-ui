'use client';
import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {usePossibleMealTypes} from '@/hooks/meal/mealTypes';
import {useUserDataActor} from '@/hooks/userData/actor/main';
import {useCalculatedConfigBundle} from '@/hooks/userData/config/bundle/calculated';
import {CookingServerDataProps} from '@/ui/cooking/common/type';
import {useMealMakerFilter} from '@/ui/cooking/make/hook';
import {MealMakerInputUI} from '@/ui/cooking/make/input/main';
import {MealMakerRecipe} from '@/ui/cooking/make/recipe/main';
import {MealMakerCommonProps, MealMakerFilter} from '@/ui/cooking/make/type';
import {toCookingConfigFromMealMakerFilter} from '@/ui/cooking/make/utils';
import {subtractIngredientCount} from '@/utils/game/ingredient/counter';
import {isNotNullish} from '@/utils/type';


export const MealMakerClient = (props: CookingServerDataProps) => {
  const {
    ingredientMap,
    mealMap,
    potInfoList,
    recipeLevelData,
    preloaded,
  } = props;

  const {
    filter,
    setFilter,
    isIncluded,
  } = useMealMakerFilter(props);
  const {actAsync, session, status} = useUserDataActor();
  const {calculatedUserConfig} = useCalculatedConfigBundle({
    bundle: {
      server: preloaded,
      client: session.data?.user.preloaded,
    },
    ...props,
  });

  const meals = Object.values(mealMap).filter(isNotNullish);
  const mealTypes = usePossibleMealTypes(meals);
  const validMeals = React.useMemo(() => meals.filter(({id}) => isIncluded[id]), [filter]);

  const commonProps: MealMakerCommonProps = {
    filter,
    setFilter,
    meals: validMeals,
    mealTypes,
    ingredientMap,
    potInfoList,
    recipeLevelData,
    calculatedUserConfig,
    status,
    onCook: async (ingredientsUsed) => {
      setFilter((original) => ({
        ...original,
        inventory: subtractIngredientCount(filter.inventory, ingredientsUsed),
      } satisfies MealMakerFilter));

      if (!actAsync) {
        return;
      }

      await actAsync({
        action: 'upload',
        options: {
          type: 'config.cooking',
          data: toCookingConfigFromMealMakerFilter({preloaded: preloaded.cookingConfig, filter}),
        },
      });
    },
    preloaded: preloaded.cookingConfig,
  };

  return (
    <Flex className="gap-1">
      <MealMakerInputUI {...commonProps}/>
      <AdsUnit hideIfNotBlocked/>
      <MealMakerRecipe {...commonProps}/>
    </Flex>
  );
};
