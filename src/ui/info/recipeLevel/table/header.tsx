import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {EnergyIcon} from '@/components/shared/icon/energy';


export const RecipeLevelDataHeader = () => {
  const t = useTranslations('UI.InPage.Info.RecipeLevel.Table');

  return (
    <tr className="[&>td]:whitespace-nowrap">
      <td>
        {t('Level')}
      </td>
      <td>
        {t('Bonus')}
      </td>
      <td>
        <Flex direction="row" center>
          <EnergyIcon alt={t('Strength')} noInvert/>
          {t('ToNext')}
        </Flex>
      </td>
      <td>
        <Flex direction="row" center>
          <EnergyIcon alt={t('Strength')} noInvert/>
          {t('TotalRequired')}
        </Flex>
      </td>
      <td>
        <Flex direction="row" center>
          <EnergyIcon alt={t('Strength')} noInvert/>
          {t('Accumulated')}
        </Flex>
      </td>
    </tr>
  );
};
