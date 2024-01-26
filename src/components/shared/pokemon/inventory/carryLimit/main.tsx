import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {PokemonInventoryCommonProps} from '@/components/shared/pokemon/inventory/type';
import {getPackStatsStyle} from '@/components/shared/pokemon/utils';
import {formatInt} from '@/utils/number/format';


type Props = PokemonInventoryCommonProps & {
  carryLimit: number,
};

export const PokemonCarryLimit = ({carryLimit, ...props}: Props) => {
  const {normalTextSize} = props;
  const t = useTranslations('UI.Common');

  return (
    <Flex direction="row" noFullWidth className={getPackStatsStyle(props)}>
      <GenericIconLarger
        src="/images/generic/bag.png"
        alt={t('MaxCarry')}
        dimension={normalTextSize ? 'size-6' : 'size-4'}
      />
      <div>{formatInt(carryLimit)}</div>
    </Flex>
  );
};
