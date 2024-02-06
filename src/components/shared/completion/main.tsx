import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {formatFloat, formatInt} from '@/utils/number/format/regular';
import {Nullable} from '@/utils/type';


type Props = {
  completed: Nullable<number>,
  total: Nullable<number>,
  className?: string,
};

export const CompletionResultUI = ({completed, total, className}: Props) => {
  return (
    <Flex direction="row" noFullWidth className={clsx('gap-1 whitespace-nowrap', className)}>
      <div>{formatInt(completed)}</div>
      <div>/</div>
      <div>{formatInt(total)}</div>
      <div>({completed && total ? formatFloat(completed / total * 100) : '-'}%)</div>
    </Flex>
  );
};
