import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {useTranslations} from 'next-intl';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {GenericIcon} from '@/components/shared/icon/common/main';
import {PotIcon} from '@/components/shared/icon/pot';
import {MealLink} from '@/components/shared/meal/link/main';
import {MealDetails, MealId} from '@/types/game/meal/main';
import {PotInfoFilter, PotLevelInfo} from '@/ui/info/pot/type';
import {formatInt} from '@/utils/number/format/regular';


type Props = {
  filter: PotInfoFilter,
  cumulativeCost: number,
  potInfo: PotLevelInfo,
  unlockedRecipes: number,
  mealDetails: MealDetails[],
  isMealIncluded: FilterInclusionMap<MealId>,
};

export const PotRecipeUnlockSection = ({
  filter,
  cumulativeCost,
  potInfo,
  unlockedRecipes,
  mealDetails,
  isMealIncluded,
}: Props) => {
  const {showStats, capacity} = filter;

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
            <div className="text-xs">(+{mealDetails.length})</div>
          </Flex>
        </Flex>
      </Flex>
      <HorizontalSplitter className="block md:hidden"/>
      {mealDetails.length ?
        <Grid className="grid-cols-1 gap-1.5 xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {mealDetails.map((mealDetails) => (
            <AnimatedCollapse key={mealDetails.meal.id} appear show={!!isMealIncluded[mealDetails.meal.id]}>
              <MealLink
                mealDetails={mealDetails}
                showStats={showStats}
              />
            </AnimatedCollapse>
          ))}
        </Grid> :
        <XCircleIcon className="m-auto size-10"/>}
    </Flex>
  );
};
