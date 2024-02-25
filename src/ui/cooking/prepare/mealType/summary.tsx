import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {ColoredStrengthIcon} from '@/components/shared/icon/strengthColored';
import {MealPreparerMealTypeSummary} from '@/ui/cooking/prepare/hook/type';
import {formatInt} from '@/utils/number/format/regular';


type Props = {
  stats: MealPreparerMealTypeSummary,
};

export const MealPreparerMealTypeSummaryUI = ({stats}: Props) => {
  const t = useTranslations('UI.InPage.Cooking');

  return (
    <Flex direction="row" noFullWidth className="items-end justify-end gap-1.5 text-sm">
      <ColoredStrengthIcon dimension="size-8" alt={t('Energy')}/>
      <div>{t('Total')}</div>
      <div className="text-2xl">{formatInt(stats.recipeOnly)}</div>
      <div>{t('Preparer.IncludeFiller')}</div>
      <div className="text-2xl">{formatInt(stats.withFiller)}</div>
    </Flex>
  );
};
