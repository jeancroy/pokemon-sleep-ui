import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {ItemMetaUI} from '@/components/shared/item/meta';
import {ItemMetaCommonProps} from '@/components/shared/item/type';
import {formatInt} from '@/utils/number/format/regular';


type Props = ItemMetaCommonProps & {
  className?: string,
};

export const ItemPackUI = ({className, ...props}: Props) => {
  const {itemPack} = props;

  return (
    <Flex noFullWidth direction="row" className={clsx('items-center gap-1', className)}>
      <ItemMetaUI {...props}/>
      <span>&times;</span>
      {formatInt(itemPack.count)}
    </Flex>
  );
};
