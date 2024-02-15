import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {ItemMetaUI} from '@/components/shared/item/meta';
import {ItemPackCommonProps} from '@/components/shared/item/type';
import {formatInt} from '@/utils/number/format/regular';


export const ItemPackUI = (props: ItemPackCommonProps) => {
  const {itemPack} = props;

  return (
    <Flex noFullWidth direction="row" className="items-center gap-1">
      <ItemMetaUI {...props}/>
      <span>&times;</span>
      {formatInt(itemPack.count)}
    </Flex>
  );
};
