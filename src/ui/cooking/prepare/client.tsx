'use client';
import React from 'react';

import {useSession} from 'next-auth/react';

import {defaultCookingConfig} from '@/const/user/config/cooking';
import {usePossibleMealTypes} from '@/hooks/meal';
import {useCalculatedConfigBundle} from '@/hooks/userData/config/bundle/calculated';
import {CookingServerDataProps} from '@/ui/cooking/common/type';
import {generateCookingCommonFilter} from '@/ui/cooking/common/utils/main';
import {useMealPreparerInfo} from '@/ui/cooking/prepare/hook/main';
import {MealPreparerInput} from '@/ui/cooking/prepare/input/main';
import {MealPreparerByMealTypes} from '@/ui/cooking/prepare/mealType/main';
import {MealPreparerSummary} from '@/ui/cooking/prepare/summary/main';
import {MealPreparerCommonProps, MealPreparerFilter} from '@/ui/cooking/prepare/type';
import {getMaxRecipeLevel} from '@/utils/game/meal/recipeLevel';
import {cloneMerge} from '@/utils/object/cloneMerge';
import {isNotNullish} from '@/utils/type';


export const MealPreparerClient = (props: CookingServerDataProps) => {
  const {
    mealMap,
    recipeLevelData,
    preloaded,
  } = props;

  const {data: session} = useSession();
  const {calculatedConfigBundle} = useCalculatedConfigBundle({
    bundle: {
      server: preloaded,
      client: session?.user.preloaded,
    },
    ...props,
  });
  const [filter, setFilter] = React.useState<MealPreparerFilter>({
    ...generateCookingCommonFilter(preloaded.cookingConfig),
    mealsWanted: cloneMerge(defaultCookingConfig.mealsWanted, preloaded.cookingConfig?.mealsWanted) ?? {},
    showRecipeStrength: false,
  });

  const meals = Object.values(mealMap).filter(isNotNullish);
  const mealTypes = usePossibleMealTypes(meals);

  const commonProps: MealPreparerCommonProps = {
    ...props,
    filter,
    setFilter,
    mealTypes,
    maxRecipeLevel: getMaxRecipeLevel({recipeLevelData}),
    calculatedSettings: calculatedConfigBundle.calculatedSettings,
    preloaded: preloaded.cookingConfig,
  };

  const info = useMealPreparerInfo({
    ...commonProps,
    meals,
  });

  return (
    <>
      <MealPreparerInput {...commonProps}/>
      <MealPreparerByMealTypes info={info} {...commonProps}/>
      <MealPreparerSummary info={info} inventory={filter.inventory}/>
    </>
  );
};
