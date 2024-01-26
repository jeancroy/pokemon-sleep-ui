import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {PokemonInventoryCommonProps} from '@/components/shared/pokemon/inventory/type';
import {getPackStatsStyle} from '@/components/shared/pokemon/utils';
import {formatSeconds} from '@/utils/time';


type Props = PokemonInventoryCommonProps & {
  seconds: number | null,
  alt: string,
  title?: React.ReactNode,
};

export const PokemonTimeToFullPackSingle = ({seconds, alt, title, ...props}: Props) => {
  const {normalTextSize} = props;

  return (
    <Flex direction="row" noFullWidth className={getPackStatsStyle(props)}>
      {title}
      <GenericIconLarger
        src="/images/generic/bag.png"
        alt={alt}
        dimension={normalTextSize ? 'size-6' : 'size-4'}
        noShrink
      />
      <Flex center>
        {seconds ? formatSeconds({seconds}) : '-'}
      </Flex>
    </Flex>
  );
};
