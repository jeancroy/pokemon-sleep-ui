import React from 'react';

import {Flex} from '@/components/layout/flex/common';


type Props = {
  titleIcon: React.ReactNode,
  title: string,
};

export const UserSettingsSection = ({titleIcon, title, children}: React.PropsWithChildren<Props>) => {
  return (
    <Flex className="bg-plate gap-1.5">
      <Flex direction="row" className="items-center gap-1">
        <div className="relative size-7">
          {titleIcon}
        </div>
        <span className="text-lg">{title}</span>
      </Flex>
      {children}
    </Flex>
  );
};
