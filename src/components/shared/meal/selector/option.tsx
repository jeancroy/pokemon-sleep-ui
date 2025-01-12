import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InfoIcon} from '@/components/icons/info';
import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {IngredientIconsFromMeal} from '@/components/shared/ingredient/icons/fromMeal';
import {MealImage} from '@/components/shared/meal/image';
import {RecipeLevelInput} from '@/components/shared/meal/recipeLevel/input/main';
import {MealSelectorLevelUpdatingProps} from '@/components/shared/meal/selector/type';
import {mealTypeBackgroundStyle} from '@/styles/game/mealType';
import {Meal} from '@/types/game/meal/main';


type Props = MealSelectorLevelUpdatingProps & {
  meal: Meal | undefined,
  onClick: () => void,
};

export const MealSelectorOption = ({
  mealType,
  maxRecipeLevel,
  recipeLevel,
  onLevelUpdated,
  meal,
  onClick,
}: Props) => {
  const t = useTranslations('Game');
  const ingredientCount = meal ? meal.ingredientCount : 0;

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
                <IngredientIconsFromMeal meal={meal} noLink useTextShadow/>
              </Flex>
            </Flex>
          </> :
          <XCircleIcon className="size-8"/>}
      </FlexButton>
      {
        meal && recipeLevel && onLevelUpdated &&
        <RecipeLevelInput
          level={recipeLevel[meal.id] ?? 1}
          maxRecipeLevel={maxRecipeLevel}
          onUpdate={(level) => onLevelUpdated(meal.id, level)}
          className="self-end"
          disabled={!ingredientCount}
        />
      }
    </Flex>
  );
};
