import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex';
import {appCompatibilityColor, appCompatibilityIcon} from '@/ui/base/navbar/userSettings/sections/app/const';


type Props = {
  title: string,
  result: boolean,
};

export const UserSettingsAppCompatibility = ({title, result}: Props) => {
  return (
    <Flex direction="row" className={clsx('items-center gap-1.5', appCompatibilityColor.get(result))}>
      <Flex direction="col" noFullWidth className="h-6 w-6">
        {appCompatibilityIcon.get(result)}
      </Flex>
      <pre>
        {title}
      </pre>
    </Flex>
  );
};
