import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {IngredientIconsFromMeal} from '@/components/shared/meal/ingredients/iconsFromMeal';
import {MealLinkProps} from '@/components/shared/meal/type';
import {getMealIngredientCount} from '@/utils/game/meal/count';
import {formatMealStrengthInfo} from '@/utils/game/meal/format';
import {getMealFinalStrength} from '@/utils/game/meal/strength/final/recipe';


export const MealLinkDetail = (props: MealLinkProps) => {
  const {level, meal, showEnergy} = props;

  const t = useTranslations('UI.InPage.Cooking');

  const info = getMealFinalStrength({
    ...props,
    filler: [],
  });

  return (
    <Flex direction="row" className="items-end gap-0.5 text-xs">
      <Flex noFullWidth center className="info-icon-normal text-shadow-preset size-6">
        {getMealIngredientCount(meal)}
      </Flex>
      <Flex noFullWidth className="gap-0.5">
        {
          showEnergy &&
          <Flex direction="row" noFullWidth className="items-end gap-0.5 whitespace-nowrap">
            <ColoredEnergyIcon dimension="size-4" alt={t('Energy')}/>
            <div>
              {formatMealStrengthInfo({info})}
            </div>
            <div>@</div>
            <div>Lv.{level}</div>
          </Flex>
        }
        <IngredientIconsFromMeal meal={meal}/>
      </Flex>
    </Flex>
  );
};
