'use client';
import React from 'react';

import {useSession} from 'next-auth/react';

import {defaultCookingConfig} from '@/const/user/config/cooking';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {usePossibleMealTypes} from '@/hooks/meal/mealTypes';
import {useCalculatedConfigBundle} from '@/hooks/userData/config/bundle/calculated';
import {generateCookingCommonFilter} from '@/ui/cooking/common/utils/main';
import {useMealPreparerInfo} from '@/ui/cooking/prepare/hook/main';
import {MealPreparerInput} from '@/ui/cooking/prepare/input/main';
import {MealPreparerByMealTypes} from '@/ui/cooking/prepare/mealType/main';
import {MealPreparerSummary} from '@/ui/cooking/prepare/summary/main';
import {MealPreparerCommonProps, MealPreparerFilter} from '@/ui/cooking/prepare/type';
import {getMaxRecipeLevel} from '@/utils/game/meal/recipeLevel';
import {cloneMerge} from '@/utils/object/cloneMerge';
import {isNotNullish} from '@/utils/type';


export const MealPreparerClient = () => {
  const serverData = useCommonServerData();
  const {
    mealMap,
    recipeLevelData,
    serverConfigBundle,
  } = serverData;

  const {data: session} = useSession();
  const calculatedConfigBundle = useCalculatedConfigBundle({
    bundle: {
      server: serverConfigBundle,
      client: session?.user.preloaded,
    },
    ...serverData,
  });
  const [filter, setFilter] = React.useState<MealPreparerFilter>({
    ...generateCookingCommonFilter(serverConfigBundle.cookingConfig),
    mealsWanted: cloneMerge(defaultCookingConfig.mealsWanted, serverConfigBundle.cookingConfig?.mealsWanted) ?? {},
    showRecipeStrength: false,
  });

  const meals = Object.values(mealMap).filter(isNotNullish);
  const mealTypes = usePossibleMealTypes(meals);

  const commonProps: MealPreparerCommonProps = {
    ...serverData,
    filter,
    setFilter,
    mealTypes,
    maxRecipeLevel: getMaxRecipeLevel({recipeLevelData}),
    calculatedUserConfig: calculatedConfigBundle.calculatedUserConfig,
    preloaded: serverConfigBundle.cookingConfig,
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
