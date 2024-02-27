import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {ItemIcon} from '@/components/shared/icon/item';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {ResearchRankInfoTableCommonProps} from '@/ui/info/researchRank/table/type';


export const ResearchRankInfoHeader = ({dreamClusterData, showRewards}: ResearchRankInfoTableCommonProps) => {
  const t = useTranslations('UI.InPage.Info.ResearchRank.Table');
  const t2 = useTranslations('Game');
  const t3 = useTranslations('UI.Common');

  return (
    <tr className="[&>td]:whitespace-nowrap">
      <td>
        {t('Rank')}
      </td>
      <td>
        {t('ToNext')}
      </td>
      <td>
        {t('Accumulated')}
      </td>
      <td>
        <Flex direction="row" className="items-center gap-0.5">
          <GenericPokeballIcon alt={t('PokemonMaxLevel.Long')}/>
          <span>{t('PokemonMaxLevel.Short')}</span>
        </Flex>
      </td>
      {dreamClusterData.map(({itemId}) => (
        <td key={itemId}>
          <Flex center>
            <ItemIcon itemId={itemId} alt={t2(`Item.${itemId}`)} noShrink dimension="size-6" className="scale-150"/>
          </Flex>
        </td>
      ))}
      {
        showRewards &&
        <td>
          {t3('Rewards')}
        </td>
      }
    </tr>
  );
};
