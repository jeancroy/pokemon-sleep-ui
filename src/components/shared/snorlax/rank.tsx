import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {imageSmallIconSizes} from '@/styles/image';
import {SnorlaxRank} from '@/types/game/rank';
import {Dimension} from '@/types/style';
import {classNames} from '@/utils/react';


type Props = {
  rank: SnorlaxRank,
  dimension?: Dimension,
  hideTextBelowMd?: boolean,
};

export const SnorlaxRankUI = ({rank, dimension, hideTextBelowMd}: Props) => {
  const t = useTranslations('UI.Common');
  const t2 = useTranslations('Game.RankTitle');

  const rankTitle = t2(rank.title.toString());

  return (
    <Flex direction="row" center noFullWidth className="gap-1">
      <div className={`relative ${dimension ?? 'h-6 w-6'}`}>
        <NextImage
          src={`/images/rank/${rank.title}.png`} alt={t('Rank')}
          sizes={imageSmallIconSizes}
        />
      </div>
      <div className={classNames('whitespace-nowrap', hideTextBelowMd ? 'hidden md:block' : '')}>
        {rankTitle}
      </div>
      <div>{rank.number}</div>
    </Flex>
  );
};
