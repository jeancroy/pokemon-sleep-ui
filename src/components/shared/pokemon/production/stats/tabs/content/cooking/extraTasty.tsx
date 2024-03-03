import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {ExtraTastyInfoUnitUI} from '@/components/shared/cooking/extraTasty/infoUnit/main';
import {PokemonDetailedProductionProps} from '@/components/shared/pokemon/production/stats/type';
import {mealOfDayIcon} from '@/const/game/cooking/mealOfDay';
import {daysInWeek, weekOfDayI18nId} from '@/const/weekOfDay';
import {cookingMeals} from '@/types/userData/config/cooking/meal';
import {generateRangeOfNumber} from '@/utils/number/range';


export const PokemonDetailedProductionCookingExtraTasty = ({metadata}: PokemonDetailedProductionProps) => {
  const {byMeal, overall} = metadata.extraTastyInfo;

  const t = useTranslations('UI.Component.PokemonDetailedProduction.Cooking');
  const t2 = useTranslations('UI.WeekOfDay');

  return (
    <Flex className="info-section">
      <div className="text-left text-lg">{t('ExtraTasty.Name')}</div>
      <div className="text-left">{t('ExtraTasty.Average')}</div>
      <ExtraTastyInfoUnitUI unit={overall} size="normal" className="bg-plate"/>
      <div className="text-left">{t('ExtraTasty.ByMeal')}</div>
      {generateRangeOfNumber({max: daysInWeek}).map((weekOfDay) => (
        <Flex key={weekOfDay} center className="bg-plate gap-1">
          <div>{t2(weekOfDayI18nId[weekOfDay])}</div>
          <Flex center className="gap-0.5 lg:flex-row lg:gap-3">
            {cookingMeals.map((meal, idx) => (
              <Flex key={meal} direction="row" center className="gap-1">
                <div className="size-6 shrink-0">
                  {mealOfDayIcon[meal]}
                </div>
                <ExtraTastyInfoUnitUI unit={byMeal[weekOfDay * 3 + idx]} size="normal"/>
              </Flex>
            ))}
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};
