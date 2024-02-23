'use client';
import React from 'react';

import {clsx} from 'clsx';
import {useSession} from 'next-auth/react';

import {AdsUnit} from '@/components/ads/main';
import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Grid} from '@/components/layout/grid';
import {useMealInputFilter} from '@/components/shared/meal/filter/hook';
import {MealFilter} from '@/components/shared/meal/filter/main';
import {generateEmptyMealFilter} from '@/components/shared/meal/filter/utils';
import {MealLink} from '@/components/shared/meal/link/main';
import {useCalculatedConfigBundle} from '@/hooks/userData/config/bundle/calculated';
import {MealDataProps} from '@/ui/meal/index/type';
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
  } = useMealInputFilter({
    ingredientMap,
    recipeLevelData,
    meals,
    calculatedConfigBundle,
    initialFilter: generateEmptyMealFilter(),
  });

  const maxRecipeLevel = getMaxRecipeLevel({recipeLevelData});

  return (
    <>
      <MealFilter
        filter={filter}
        setFilter={setFilter}
        ingredientMap={ingredientMap}
        meals={meals}
        maxRecipeLevel={maxRecipeLevel}
      />
      <AdsUnit hideIfNotBlocked/>
      <Grid className={clsx(
        'grid-cols-1 gap-1.5 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-5',
      )}>
        {data
          .sort((a, b) => {
            if (a.meal.type > b.meal.type) {
              return 1;
            }
            if (a.meal.type < b.meal.type) {
              return -1;
            }

            if (a.meal.ingredientCount > b.meal.ingredientCount) {
              return -1;
            }
            if (a.meal.ingredientCount < b.meal.ingredientCount) {
              return 1;
            }

            return 0;
          })
          .map((mealDetails) => (
            <AnimatedCollapse key={mealDetails.meal.id} appear show={!!isIncluded[mealDetails.meal.id]}>
              <MealLink mealDetails={mealDetails} showStats={filter.showStats}/>
            </AnimatedCollapse>
          ))}
      </Grid>
    </>
  );
};
