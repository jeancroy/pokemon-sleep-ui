import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {PokemonInventoryCommonProps} from '@/components/shared/pokemon/inventory/type';
import {getPackStatsStyle} from '@/components/shared/pokemon/utils';
import {FullPackStatsOfSleep} from '@/types/game/producing/inventory';
import {formatSeconds} from '@/utils/time';
import {Nullable} from '@/utils/type';


type Props = PokemonInventoryCommonProps & {
  fullPackStatsOfSleep: Nullable<FullPackStatsOfSleep>,
  alt: string,
  title?: React.ReactNode,
};

export const PokemonTimeToFullPackSingle = ({fullPackStatsOfSleep, alt, title, ...props}: Props) => {
  const {normalTextSize} = props;

  const isPossibleToFill = !!fullPackStatsOfSleep?.duration.filled;

  return (
    <Flex direction="row" noFullWidth center className={getPackStatsStyle(props)}>
      {title}
      <GenericIconLarger
        src="/images/generic/bag.png"
        alt={alt}
        dimension={normalTextSize ? 'size-6' : 'size-4'}
        noShrink
      />
      <Flex noFullWidth center>
        {isPossibleToFill ? formatSeconds({seconds: fullPackStatsOfSleep?.duration.vacant}) : '-'}
      </Flex>
    </Flex>
  );
};
