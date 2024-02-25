'use client';
import React from 'react';

import {clsx} from 'clsx';
import {useSession} from 'next-auth/react';

import {AdsUnit} from '@/components/ads/main';
import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Grid} from '@/components/layout/grid';
import {useMealInputFilter} from '@/components/shared/meal/filter/hook';
import {generateEmptyMealFilter} from '@/components/shared/meal/filter/utils';
import {MealLink} from '@/components/shared/meal/link/main';
import {useCalculatedConfigBundle} from '@/hooks/userData/config/bundle/calculated';
import {MealIndexInput} from '@/ui/meal/index/input';
import {MealDataProps, MealIndexFilter} from '@/ui/meal/index/type';
import {sortMealIndexRecipe} from '@/ui/meal/index/utils';
import {getMaxRecipeLevel} from '@/utils/game/meal/recipeLevel';
import {isNotNullish} from '@/utils/type';


export const MealIndexClient = ({ingredientMap, recipeLevelData, preloaded, ...props}: MealDataProps) => {
  const {mealMap} = props;
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
    isIncluded,
    filter,
    setFilter,
    data,
  } = useMealInputFilter<MealIndexFilter>({
    ingredientMap,
    recipeLevelData,
    meals,
    calculatedConfigBundle,
    initialFilter: {
      ...generateEmptyMealFilter(),
      sort: 'recipeBaseStrength',
    },
  });

  return (
    <>
      <MealIndexInput
        filter={filter}
        setFilter={setFilter}
        ingredientMap={ingredientMap}
        meals={meals}
        maxRecipeLevel={getMaxRecipeLevel({recipeLevelData})}
      />
      <AdsUnit hideIfNotBlocked/>
      <Grid className={clsx(
        'grid-cols-1 gap-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-5',
      )}>
        {data.sort(sortMealIndexRecipe(filter.sort)).map((mealDetails) => (
          <AnimatedCollapse key={mealDetails.meal.id} appear show={!!isIncluded[mealDetails.meal.id]}>
            <MealLink mealDetails={mealDetails} showStats={filter.showStats}/>
          </AnimatedCollapse>
        ))}
      </Grid>
    </>
  );
};
