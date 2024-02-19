import React from 'react';

import WrenchIcon from '@heroicons/react/24/solid/WrenchIcon';

import {Flex} from '@/components/layout/flex/common';
import {UserConfigAppInfoIcon} from '@/ui/base/navbar/userConfig/sections/app/icon';


type Props = {
  icon: React.ReactNode,
  buildId: string | undefined,
};

export const UserConfigAppBuildInfo = ({icon, buildId}: Props) => {
  return (
    <Flex direction="row" center className="items-center gap-1.5 rounded-lg border border-slate-500 p-1.5 text-sm">
      <UserConfigAppInfoIcon icon={icon}/>
      <UserConfigAppInfoIcon icon={<WrenchIcon/>}/>
      <code className="truncate">
        {buildId ?? '(N/A)'}
      </code>
    </Flex>
  );
};
