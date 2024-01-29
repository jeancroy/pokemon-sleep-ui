import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {formatInt} from '@/utils/number/format';


type Props = {
  icon: React.ReactNode,
  count: number,
};

export const GameProgressRewardItem = ({icon, count}: Props) => {
  return (
    <Flex noFullWidth direction="row" className="items-center gap-1">
      {icon}
      <span>&times;</span>
      {formatInt(count)}
    </Flex>
  );
};
