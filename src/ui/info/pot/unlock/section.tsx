import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PotIcon} from '@/components/shared/icon/pot';
import {MealDetails} from '@/types/game/meal/main';
import {PotRecipeUnlockList} from '@/ui/info/pot/unlock/list';
import {PotRecipeUnlockRequirements} from '@/ui/info/pot/unlock/requirements';
import {PotRecipeUnlockCommonProps} from '@/ui/info/pot/unlock/type';


type Props = PotRecipeUnlockCommonProps & {
  mealDetails: MealDetails[],
};

export const PotRecipeUnlockSection = ({mealDetails, ...props}: Props) => {
  const {
    filter,
    potInfo,
  } = props;

  const t = useTranslations('UI.InPage.Info.Pot');

  return (
    <Flex className="info-section md:flex-row md:items-center">
      <Flex direction="row" center noFullWidth className="shrink-0 gap-1.5 md:w-32 md:flex-col">
        <Flex direction="row" center noFullWidth className="gap-1">
          <PotIcon alt={t('Capacity')} dimension="size-7"/>
          <span>{potInfo.capacity}</span>
        </Flex>
        <PotRecipeUnlockRequirements {...props}/>
      </Flex>
      <HorizontalSplitter className="block md:hidden"/>
      <PotRecipeUnlockList filter={filter} mealDetails={mealDetails}/>
    </Flex>
  );
};
