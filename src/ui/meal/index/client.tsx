'use client';
import React from 'react';

import {clsx} from 'clsx';
import {useSession} from 'next-auth/react';

import {AdsUnit} from '@/components/ads/main';
import {Grid} from '@/components/layout/grid';
import {MealLink} from '@/components/shared/meal/link';
import {useTranslatedUserSettings} from '@/hooks/userData/translated';
import {useMealFilter} from '@/ui/meal/index/hook';
import {MealInput} from '@/ui/meal/index/input/main';
import {MealDataProps} from '@/ui/meal/index/type';
import {getMealIngredientCount} from '@/utils/game/meal/count';
import {getMaxRecipeLevel} from '@/utils/game/meal/recipeLevel';
import {isNotNullish} from '@/utils/type';


export const MealIndexClient = ({ingredientMap, recipeLevelData, preloaded, ...props}: MealDataProps) => {
  const {mealMap} = props;
  const {cooking} = preloaded;

  const {data: session} = useSession();
  const {translatedSettings} = useTranslatedUserSettings({
    bundle: {
      server: preloaded,
      client: session?.user.preloaded,
    },
    ...props,
  });

  const meals = Object.values(mealMap).filter(isNotNullish);
  const mealFilterProps = useMealFilter({
    data: meals,
    preloaded: cooking,
  });

  const {isIncluded, filter} = mealFilterProps;
  const maxRecipeLevel = getMaxRecipeLevel({recipeLevelData});

  return (
    <>
      <MealInput preloaded={cooking} maxRecipeLevel={maxRecipeLevel} {...mealFilterProps}/>
      <AdsUnit hideIfNotBlocked/>
      <Grid className={clsx(
        'grid-cols-1 gap-1.5 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-5',
      )}>
        {meals
          .map((meal) => ({
            meal,
            totalIngredientCount: getMealIngredientCount(meal),
          }))
          .sort((a, b) => {
            if (a.meal.type > b.meal.type) {
              return 1;
            }
            if (a.meal.type < b.meal.type) {
              return -1;
            }

            if (a.totalIngredientCount > b.totalIngredientCount) {
              return -1;
            }
            if (a.totalIngredientCount < b.totalIngredientCount) {
              return 1;
            }

            return 0;
          })
          .map(({meal}) => (
            <div key={meal.id} className={clsx(!isIncluded[meal.id] && 'hidden')}>
              <MealLink
                meal={meal}
                level={filter.mealLevel}
                showEnergy={filter.showEnergy}
                ingredientMap={ingredientMap}
                recipeLevelData={recipeLevelData}
                mapMultiplier={translatedSettings.calculatedSettings.bonus.mapMultiplier}
              />
            </div>
          ))}
      </Grid>
    </>
  );
};
