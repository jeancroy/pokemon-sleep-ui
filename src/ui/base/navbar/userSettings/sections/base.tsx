import React from 'react';

import {Flex} from '@/components/layout/flex/common';


type Props = {
  titleIcon: React.ReactNode,
};

export const UserSettingsSection = ({titleIcon, children}: React.PropsWithChildren<Props>) => {
  return (
    <Flex className="bg-plate gap-1.5">
      <div className="relative size-10">
        {titleIcon}
      </div>
      {children}
    </Flex>
  );
};
