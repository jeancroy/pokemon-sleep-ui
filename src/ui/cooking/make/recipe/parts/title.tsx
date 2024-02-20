import React from 'react';

import {clsx} from 'clsx';

import {InfoIcon} from '@/components/icons/info';
import {Flex} from '@/components/layout/flex/common';
import {mealTypeTextStyle} from '@/styles/game/mealType';
import {CookingExternalLink} from '@/ui/cooking/common/link';
import {CookingMarkButton} from '@/ui/cooking/common/mark';
import {MealMakerRecipePartsProps} from '@/ui/cooking/make/recipe/parts/type';


export const MealMakerRecipeTitle = ({
  filter,
  setFilter,
  meal,
  mealName,
  mealsReady,
  isMealMakeable,
}: MealMakerRecipePartsProps) => {
  const isInventoryEnabled = Object.values(filter.inventory)
    .some((count) => count != null);
  return (
    <Flex direction="row" className="justify-between gap-0.5">
      <CookingMarkButton
        marked={!!filter.mealsMarked[meal.id]}
        setMarked={(updated) => setFilter((original) => ({
          ...original,
          mealsMarked: {
            ...original.mealsMarked,
            [meal.id]: updated,
          },
        }))}
      />
      <Flex direction="row" className="gap-1 truncate">
        {mealsReady >= 2 && <InfoIcon>{Math.floor(mealsReady)}</InfoIcon>}
        <div className={clsx(
          'truncate text-sm',
          mealTypeTextStyle[meal.type],
          isInventoryEnabled && !isMealMakeable && 'text-slate-400 dark:text-slate-600',
        )}>
          {mealName}
        </div>
      </Flex>
      <CookingExternalLink mealId={meal.id}/>
    </Flex>
  );
};
