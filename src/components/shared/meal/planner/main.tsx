import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {CollapsibleFull} from '@/components/layout/collapsible/full';
import {useCollapsibleControl} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {MealPlannerButton} from '@/components/shared/meal/planner/button';
import {MealSelector} from '@/components/shared/meal/selector/main';
import {mealOfDayIcon} from '@/const/game/cooking';
import {mealTypeBorderStyle, mealTypeTextStyle} from '@/styles/game/mealType';
import {RecipeLevel} from '@/types/game/cooking';
import {MealMap, MealTypeId} from '@/types/game/meal/main';
import {cookingMeals} from '@/types/userData/config/cooking/meal';
import {CookingTarget} from '@/types/userData/config/cooking/target';


type Props = {
  mealMap: MealMap,
  mealTypes: MealTypeId[],
  maxRecipeLevel: number,
  target: CookingTarget,
  setTarget: (updated: Partial<CookingTarget>) => void,
  recipeLevel: RecipeLevel,
  setRecipeLevel: (updated: Partial<RecipeLevel>) => void,
};

export const MealPlanner = ({
  mealMap,
  mealTypes,
  maxRecipeLevel,
  target,
  setTarget,
  recipeLevel,
  setRecipeLevel,
}: Props) => {
  const t = useTranslations('Game');
  const collapsible = useCollapsibleControl();

  return (
    <CollapsibleFull control={collapsible} button={
      <MealPlannerButton target={target} recipeLevel={recipeLevel} mealTypes={mealTypes}/>
    }>
      <Flex className="gap-1.5 p-1">
        {mealTypes.map((mealType) => (
          <Flex key={mealType} className={clsx('gap-1.5 rounded-lg border p-1.5', mealTypeBorderStyle[mealType])}>
            <div className={clsx('px-1 text-left', mealTypeTextStyle[mealType])}>
              {t(`MealType.${mealType}`)}
            </div>
            <Grid className="grid-cols-1 gap-1.5 lg:grid-cols-3">
              {cookingMeals.map((mealOfDay) => {
                const targetOfType = target[mealType];

                return (
                  <Flex direction="row" key={mealOfDay} className="items-center gap-1.5">
                    <div className="size-8 shrink-0">
                      {mealOfDayIcon[mealOfDay]}
                    </div>
                    <MealSelector
                      current={targetOfType ? targetOfType[mealOfDay] : undefined}
                      mealMap={mealMap}
                      mealType={mealType}
                      maxRecipeLevel={maxRecipeLevel}
                      isMealOption={({type}) => type === mealType}
                      onSelect={(meal) => setTarget({[mealType]: {[mealOfDay]: meal ? meal.id : null}})}
                      recipeLevel={recipeLevel}
                      onLevelUpdated={(id, level) => setRecipeLevel({[id]: level})}
                    />
                  </Flex>
                );
              })}
            </Grid>
          </Flex>
        ))}
      </Flex>
    </CollapsibleFull>
  );
};
