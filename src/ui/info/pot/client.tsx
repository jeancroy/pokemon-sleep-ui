'use client';
import React from 'react';

import {useSession} from 'next-auth/react';

import {useMealInputFilterLevelGnostic} from '@/components/shared/meal/filter/levelGnostic/hook';
import {generateEmptyMealFilterLevelGnostic} from '@/components/shared/meal/filter/levelGnostic/utils';
import {useCalculatedConfigBundle} from '@/hooks/userData/config/bundle/calculated';
import {PotInfoInput} from '@/ui/info/pot/input';
import {PotInfoDataProps, PotInfoFilter} from '@/ui/info/pot/type';
import {PotRecipeUnlockTable} from '@/ui/info/pot/unlock/main';
import {getMaxRecipeLevel} from '@/utils/game/meal/recipeLevel';
import {isNotNullish} from '@/utils/type';


export const PotInfoClient = (props: PotInfoDataProps) => {
  const {
    mealMap,
    ingredientMap,
    potInfoList,
    recipeLevelData,
    preloaded,
  } = props;
  const meals = Object.values(mealMap).filter(isNotNullish);

  const {data: session} = useSession();
  const calculatedConfigBundle = useCalculatedConfigBundle({
    bundle: {
      server: preloaded,
      client: session?.user.preloaded,
    },
    ...props,
  });

  const {
    filter,
    setFilter,
    isIncluded,
    data,
  } = useMealInputFilterLevelGnostic<PotInfoFilter>({
    ingredientMap,
    recipeLevelData,
    meals,
    calculatedConfigBundle,
    initialFilter: ({
      ...generateEmptyMealFilterLevelGnostic(),
      capacity: calculatedConfigBundle.bundle.cookingConfig.potCapacity,
    }),
  });

  return (
    <>
      <PotInfoInput
        filter={filter}
        setFilter={setFilter}
        ingredientMap={ingredientMap}
        potInfoList={potInfoList}
        maxRecipeLevel={getMaxRecipeLevel({recipeLevelData})}
        meals={meals}
      />
      <PotRecipeUnlockTable
        filter={filter}
        mealDetails={data}
        potInfoList={potInfoList}
        isMealIncluded={isIncluded}
      />
    </>
  );
};
