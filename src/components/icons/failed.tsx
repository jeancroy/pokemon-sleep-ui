import React from 'react';

import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon';

import {Flex} from '@/components/layout/flex/common';


type Props = {
  text: string,
};

export const Failed = ({text}: Props) => {
  return (
    <Flex center className="h-screen gap-1">
      <ExclamationTriangleIcon className="size-7"/>
      <div>
        {text}
      </div>
    </Flex>
  );
};
