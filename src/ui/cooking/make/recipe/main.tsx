import React from 'react';

import {Grid} from '@/components/layout/grid';
import {MealMakerRecipeSingle} from '@/ui/cooking/make/recipe/single';
import {MealMakerCommonProps, MealMakerRecipeData} from '@/ui/cooking/make/type';
import {getMealFinalStrength} from '@/utils/game/meal/strength/final';


export const MealMakerRecipe = ({meals, ...props}: MealMakerCommonProps) => {
  const {
    filter,
    ingredientMap,
    recipeLevelData,
    calculatedSettings,
  } = props;
  const {showUnmakeableRecipe} = filter;

  const data: MealMakerRecipeData[] = React.useMemo(
    () => meals.map((meal) => ({
      meal,
      info: getMealFinalStrength({
        level: filter.recipeLevel[meal.id] ?? 1,
        meal,
        ingredientMap,
        recipeLevelData,
        filler: [],
        mapMultiplier: calculatedSettings.bonus.mapMultiplier,
      }),
    })),
    [filter, meals, ingredientMap, calculatedSettings],
  );

  return (
    <Grid className="grid-cols-1 gap-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
      {data
        .sort((a, b) => (b.info.strengthFinal ?? 0) - (a.info.strengthFinal ?? 0))
        .map((data) => (
          <MealMakerRecipeSingle
            key={data.meal.id}
            showUnmakeableRecipe={showUnmakeableRecipe}
            {...data}
            {...props}
          />
        ))}
    </Grid>
  );
};
