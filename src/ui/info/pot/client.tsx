'use client';
import React from 'react';

import {useSession} from 'next-auth/react';

import {useMealInputFilter} from '@/components/shared/meal/filter/hook';
import {generateEmptyMealFilter} from '@/components/shared/meal/filter/utils';
import {useCalculatedConfigBundle} from '@/hooks/userData/config/bundle/calculated';
import {PotInfoInput} from '@/ui/info/pot/input';
import {PotInfoDataProps, PotInfoFilter} from '@/ui/info/pot/type';
import {PotRecipeUnlockTable} from '@/ui/info/pot/unlock/main';
import {isNotNullish} from '@/utils/type';


export const PotInfoClient = (props: PotInfoDataProps) => {
  const {mealMap, ingredientMap, recipeLevelData, preloaded} = props;
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
  } = useMealInputFilter<PotInfoFilter>({
    ingredientMap,
    recipeLevelData,
    meals,
    calculatedConfigBundle,
    initialFilter: ({
      ...generateEmptyMealFilter(),
      capacity: calculatedConfigBundle.bundle.cookingConfig.potCapacity,
    }),
  });

  return (
    <>
      <PotInfoInput
        filter={filter}
        setFilter={setFilter}
        ingredientMap={ingredientMap}
        recipeLevelData={recipeLevelData}
        meals={meals}
      />
      <PotRecipeUnlockTable filter={filter} mealDetails={data} isMealIncluded={isIncluded}/>
    </>
  );
};
