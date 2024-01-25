import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {GenericIcon} from '@/components/shared/icon/common/main';
import {PotIcon} from '@/components/shared/icon/pot';
import {MealLink} from '@/components/shared/meal/link';
import {Meal} from '@/types/game/meal/main';
import {CalculatedUserSettings} from '@/types/userData/settings';
import {PotInfoDataProps, PotInfoFilter, PotLevelInfo} from '@/ui/info/pot/type';
import {formatInt} from '@/utils/number/format';


type Props = Omit<PotInfoDataProps, 'mealMap'> & {
  filter: PotInfoFilter,
  cumulativeCost: number,
  potInfo: PotLevelInfo,
  unlockedMeals: Meal[],
  unlockedRecipes: number,
  calculatedSettings: CalculatedUserSettings,
};

export const PotRecipeUnlockSection = ({
  ingredientMap,
  filter,
  cumulativeCost,
  potInfo,
  unlockedMeals,
  unlockedRecipes,
  calculatedSettings,
}: Props) => {
  const {mealLevel, capacity, showEnergy} = filter;

  const t = useTranslations('UI.InPage.Info.Pot');

  return (
    <Flex className="button-bg gap-1.5 rounded-lg p-2 md:flex-row md:items-center">
      <Flex direction="row" center noFullWidth className="gap-1.5 md:w-48 md:flex-col">
        <Flex direction="row" center noFullWidth className="gap-1">
          <PotIcon alt={t('Capacity')} dimension="size-7"/>
          <div>{potInfo.capacity}</div>
        </Flex>
        <Flex direction="row" center noFullWidth className="gap-1">
          <GenericIcon src="/images/generic/shardWhite.png" alt={t('Expand')} dimension="size-7"/>
          {!capacity || capacity < potInfo.capacity ?
            <Flex noFullWidth className="gap-0.5">
              <div>{formatInt(cumulativeCost)}</div>
              <div className="text-xs">(+{formatInt(potInfo.cost)})</div>
            </Flex> :
            <div>-</div>}
        </Flex>
        <Flex direction="row" center noFullWidth className="gap-1">
          <GenericIcon src="/images/generic/meal.png" alt={t('UnlockedRecipes')} dimension="size-7"/>
          <Flex noFullWidth className="gap-0.5">
            <div>{unlockedRecipes}</div>
            <div className="text-xs">(+{unlockedMeals.length})</div>
          </Flex>
        </Flex>
      </Flex>
      <HorizontalSplitter className="block md:hidden"/>
      {unlockedMeals.length ?
        <Grid className="grid-cols-1 gap-1.5 xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {unlockedMeals.map((meal) => (
            <MealLink
              key={meal.id}
              meal={meal}
              level={mealLevel}
              showEnergy={showEnergy}
              ingredientMap={ingredientMap}
              mapMultiplier={calculatedSettings.bonus.mapMultiplier}
            />
          ))}
        </Grid> :
        <XCircleIcon className="m-auto size-10"/>}
    </Flex>
  );
};
