import React from 'react';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Grid} from '@/components/layout/grid';
import {MealId} from '@/types/game/meal/main';
import {MealMakerRecipeSingle} from '@/ui/cooking/make/recipe/single';
import {MealMakerCommonProps, MealMakerRecipeData} from '@/ui/cooking/make/type';
import {getMealFinalStrength} from '@/utils/game/meal/strength/final/recipe';


type Props = MealMakerCommonProps & {
  isIncluded: FilterInclusionMap<MealId>,
};

export const MealMakerRecipe = ({meals, isIncluded, ...props}: Props) => {
  const {
    filter,
    ingredientMap,
    recipeLevelData,
    calculatedUserConfig,
  } = props;
  const {showUnmakeableRecipe} = filter;
  const {mapMultiplier, strengthMultiplier} = calculatedUserConfig.bonus;

  const data: MealMakerRecipeData[] = React.useMemo(
    () => meals.map((meal) => ({
      meal,
      info: getMealFinalStrength({
        level: filter.recipeLevel[meal.id] ?? 1,
        meal,
        ingredientMap,
        recipeLevelData,
        filler: [],
        mapMultiplier,
        strengthMultiplier: strengthMultiplier.cooking,
      }),
    })),
    [filter, meals, ingredientMap, calculatedUserConfig],
  );

  return (
    <Grid className="grid-cols-1 gap-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
      {data
        .sort((a, b) => (b.info.strengthFinal ?? 0) - (a.info.strengthFinal ?? 0))
        .map((data) => (
          <AnimatedCollapse key={data.meal.id} appear show={!!isIncluded[data.meal.id]}>
            <MealMakerRecipeSingle
              showUnmakeableRecipe={showUnmakeableRecipe}
              isInventoryUnset={Object.keys(filter.inventory).length === 0}
              {...data}
              {...props}
            />
          </AnimatedCollapse>
        ))}
    </Grid>
  );
};
