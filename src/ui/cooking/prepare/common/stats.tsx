import React from 'react';

import {useTranslations} from 'next-intl';

import {AdsUnit} from '@/components/ads/main';
import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {IngredientIcons} from '@/components/shared/meal/ingredients/icons';
import {MealPreparerIngredientStats} from '@/ui/cooking/prepare/type';
import {toProducingItemFromIngredientCounter} from '@/utils/game/cooking';


type Props = {
  stats: MealPreparerIngredientStats,
  showAds?: boolean,
};

export const MealPreparerIngredientStatsUI = ({stats, showAds}: Props) => {
  const {missing, filler, required} = stats;

  const t = useTranslations('UI.InPage.Cooking');

  return (
    <>
      {showAds && <AdsUnit/>}
      <InputRowWithTitle title={t('Ingredient.Missing')} className="min-h-[2.5rem]">
        <IngredientIcons
          getMark={() => 'red'}
          dimension="size-6"
          textSizeClassName="text-lg"
          ingredients={toProducingItemFromIngredientCounter(missing)}
          className="flex-wrap justify-center"
          iconClickable
          showTotalCount
          showXMarkOnEmpty
        />
      </InputRowWithTitle>
      <InputRowWithTitle title={t('Ingredient.Filler')} className="min-h-[2.5rem]">
        <IngredientIcons
          getMark={() => 'green'}
          dimension="size-6"
          textSizeClassName="text-lg"
          ingredients={toProducingItemFromIngredientCounter(filler)}
          className="flex-wrap justify-center"
          iconClickable
          showTotalCount
          showXMarkOnEmpty
        />
      </InputRowWithTitle>
      <InputRowWithTitle title={t('Ingredient.Required')} className="min-h-[2.5rem]">
        <IngredientIcons
          dimension="size-6"
          textSizeClassName="text-lg"
          ingredients={toProducingItemFromIngredientCounter(required)}
          className="flex-wrap justify-center"
          iconClickable
          showTotalCount
          showXMarkOnEmpty
        />
      </InputRowWithTitle>
    </>
  );
};
