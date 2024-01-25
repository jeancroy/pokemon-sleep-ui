import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {PokemonPackStatsCommonProps} from '@/components/shared/pokemon/type';
import {getPackStatsStyle} from '@/components/shared/pokemon/utils';
import {formatSeconds} from '@/utils/time';


type Props = PokemonPackStatsCommonProps & {
  timeToFullPack: number,
};

export const PokemonTimeToFullPack = ({timeToFullPack, ...props}: Props) => {
  const {normalText} = props;
  const t = useTranslations('UI.InPage.Pokedex');

  return (
    <Flex direction="row" noFullWidth className={getPackStatsStyle(props)}>
      <GenericIconLarger
        src="/images/generic/bag.png"
        alt={t('Stats.TimeToFullPack')}
        dimension={normalText ? 'size-6' : 'size-4'}
      />
      <div>{formatSeconds({seconds: timeToFullPack})}</div>
    </Flex>
  );
};
