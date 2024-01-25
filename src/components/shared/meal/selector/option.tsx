import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InfoIcon} from '@/components/icons/info';
import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {MealImage} from '@/components/shared/meal/image';
import {IngredientIconsFromMeal} from '@/components/shared/meal/ingredients/iconsFromMeal';
import {MealRecipeLevelInput} from '@/components/shared/meal/recipeLevel';
import {MealSelectorLevelUpdatingProps} from '@/components/shared/meal/selector/type';
import {mealTypeBackgroundStyle} from '@/styles/game/mealType';
import {Meal, MealTypeId} from '@/types/game/meal/main';
import {getMealIngredientCount} from '@/utils/game/meal/count';


type Props = MealSelectorLevelUpdatingProps & {
  meal: Meal | undefined,
  mealType: MealTypeId,
  onClick: () => void,
};

export const MealSelectorOption = ({meal, mealType, onClick, recipeLevel, onLevelUpdated}: Props) => {
  const t = useTranslations('Game');
  const ingredientCount = meal ? getMealIngredientCount(meal) : 0;

  return (
    <Flex stretch className="gap-1.5">
      <FlexButton noFullWidth={false} onClick={onClick} center className={clsx(
        'relative h-full rounded-lg p-1.5',
        mealTypeBackgroundStyle[mealType],
      )}>
        {meal ?
          <>
            <MealImage mealId={meal.id} dimension="size-12" isAbsolute className="bottom-1 right-1 opacity-40"/>
            <Flex className="gap-1">
              <div className="text-shadow-preset truncate text-left text-sm">
                {t(`Food.${meal.id}`)}
              </div>
              <Flex noFullWidth direction="row" className="items-end gap-0.5 text-xs">
                <InfoIcon dimension="size-5">
                  {ingredientCount}
                </InfoIcon>
                <IngredientIconsFromMeal meal={meal}/>
              </Flex>
            </Flex>
          </> :
          <XCircleIcon className="size-8"/>}
      </FlexButton>
      {
        meal && recipeLevel && onLevelUpdated &&
        <MealRecipeLevelInput
          level={recipeLevel[meal.id] ?? 1}
          onUpdate={(level) => onLevelUpdated(meal.id, level)}
          className="self-end"
          disabled={!ingredientCount}
        />
      }
    </Flex>
  );
};
