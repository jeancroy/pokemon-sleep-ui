import React from 'react';

import {GenericIcon} from '@/components/shared/icon/common/main';
import {IconProps} from '@/components/shared/icon/type';
import {ItemId} from '@/types/game/item';


type Props = IconProps & {
  itemId: ItemId,
};

export const ItemIcon = ({itemId, ...props}: Props) => {
  return <GenericIcon src={`/images/item/${itemId}.png`} {...props}/>;
};
