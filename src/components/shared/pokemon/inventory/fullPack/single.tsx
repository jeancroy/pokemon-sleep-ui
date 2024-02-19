import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {getPokemonTimeToFullPackText} from '@/components/shared/pokemon/inventory/fullPack/utils';
import {PokemonInventoryCommonProps} from '@/components/shared/pokemon/inventory/type';
import {getPackStatsStyle} from '@/components/shared/pokemon/utils';
import {FullPackStatsOfSleep} from '@/types/game/producing/inventory';
import {Nullable} from '@/utils/type';


type Props = PokemonInventoryCommonProps & {
  fullPackStatsOfSleep: Nullable<FullPackStatsOfSleep>,
  alt: string,
  title?: React.ReactNode,
};

export const PokemonTimeToFullPackSingle = ({fullPackStatsOfSleep, alt, title, ...props}: Props) => {
  const {normalTextSize} = props;

  return (
    <Flex direction="row" noFullWidth center className={clsx('whitespace-nowrap', getPackStatsStyle(props))}>
      {title}
      <GenericIconLarger
        src="/images/generic/bag.png"
        alt={alt}
        dimension={normalTextSize ? 'size-6' : 'size-4'}
        noShrink
      />
      <span>{getPokemonTimeToFullPackText(fullPackStatsOfSleep)}</span>
    </Flex>
  );
};
