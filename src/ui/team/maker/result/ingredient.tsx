import React from 'react';

import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import ExclamationCircleIcon from '@heroicons/react/24/outline/ExclamationCircleIcon';

import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {IngredientIcons} from '@/components/shared/meal/ingredients/icons';
import {Dimension} from '@/types/style';
import {TeamMakerIngredientStats} from '@/ui/team/maker/type/common';
import {toProducingItemFromIngredientCounter} from '@/utils/game/cooking';
import {formatInt} from '@/utils/number/format';


type Props = {
  ingredientStats: TeamMakerIngredientStats,
};

export const TeamMakerIngredientStatsUI = ({ingredientStats}: Props) => {
  const {surplus, shortage} = ingredientStats;
  const iconDimension: Dimension = 'h-6 w-6';

  return (
    <>
      <InputRowWithTitle title={<ExclamationCircleIcon className={iconDimension}/>} className="min-h-[2.5rem]">
        <IngredientIcons
          getMark={() => 'red'}
          dimension={iconDimension}
          textSizeClassName="text-lg"
          ingredients={toProducingItemFromIngredientCounter(shortage)}
          className="flex-wrap justify-center"
          iconClickable
          showXMarkOnEmpty
          formatQty={(qty) => `-${formatInt(qty)}`}
        />
      </InputRowWithTitle>
      <InputRowWithTitle title={<CheckCircleIcon className={iconDimension}/>} className="min-h-[2.5rem]">
        <IngredientIcons
          getMark={() => 'green'}
          dimension={iconDimension}
          textSizeClassName="text-lg"
          ingredients={toProducingItemFromIngredientCounter(surplus)}
          className="flex-wrap justify-center"
          iconClickable
          showXMarkOnEmpty
          formatQty={(qty) => `+${formatInt(qty)}`}
        />
      </InputRowWithTitle>
    </>
  );
};
