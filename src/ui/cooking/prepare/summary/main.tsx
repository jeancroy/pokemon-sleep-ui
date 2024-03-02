import React from 'react';

import {IngredientCounter} from '@/types/game/ingredient';
import {MealPreparerIngredientStatsUI} from '@/ui/cooking/prepare/common/stats';
import {MealPreparerInfo} from '@/ui/cooking/prepare/hook/type';
import {getMealPreparerIngredientStats} from '@/ui/cooking/prepare/utils';
import {getMealIngredientsRequiredCommon} from '@/utils/game/cooking/meal/ingredients';


type Props = {
  inventory: IngredientCounter,
  info: MealPreparerInfo,
};

export const MealPreparerSummary = ({inventory, info}: Props) => {
  const stats = getMealPreparerIngredientStats({
    required: getMealIngredientsRequiredCommon(
      Object.values(info).map(({ingredients}) => ingredients.required),
    ),
    inventory,
  });

  return <MealPreparerIngredientStatsUI stats={stats} showAds/>;
};
