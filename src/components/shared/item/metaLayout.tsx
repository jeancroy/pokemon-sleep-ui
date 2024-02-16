import React from 'react';

import {Flex} from '@/components/layout/flex/common';


type Props = {
  name: string,
};

export const ItemMetaLayout = ({name, children}: React.PropsWithChildren<Props>) => {
  return (
    <Flex direction="row" noFullWidth className="items-center gap-1">
      {children}
      <span>{name}</span>
    </Flex>
  );
};
