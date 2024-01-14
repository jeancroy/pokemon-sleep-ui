import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';


type Props = {
  title: React.ReactNode,
  children: React.ReactNode,
  highlight?: boolean,
  flexibleChildrenHeight?: boolean,
};

export const GameProgressInfoSection = ({title, children, highlight, flexibleChildrenHeight}: Props) => {
  return (
    <Flex center className={clsx(
      'gap-1 rounded-lg',
      highlight ? 'info-highlight-inner p-1.5' : 'bg-slate-500/10 p-1',
    )}>
      <Flex center direction="row" noFullWidth className="w-56 gap-1 whitespace-nowrap text-sm">
        {title}
      </Flex>
      <Flex center className={clsx(!flexibleChildrenHeight && 'h-8')}>
        {children}
      </Flex>
    </Flex>
  );
};
