import React from 'react';

import {Flex} from '@/components/layout/flex/common';


type Props = {
  name: string,
  hideName: boolean,
};

export const ItemMetaLayout = ({name, hideName, children}: React.PropsWithChildren<Props>) => {
  return (
    <Flex direction="row" noFullWidth className="items-center gap-1">
      {children}
      {!hideName && <span>{name}</span>}
    </Flex>
  );
};
