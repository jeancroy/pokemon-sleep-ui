import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {formatInt} from '@/utils/number/format/regular';


type Props = {
  icon: React.ReactNode,
  userCount: number,
};

export const HomeUserCount = ({icon, userCount}: Props) => {
  return (
    <Flex noFullWidth direction="row" className="gap-1.5">
      {icon}
      <div>{formatInt(userCount)}</div>
    </Flex>
  );
};
