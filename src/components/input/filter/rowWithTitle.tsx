import React from 'react';

import {clsx} from 'clsx';

import {InputRow} from '@/components/input/filter/row';
import {InputRowProps} from '@/components/input/filter/type';
import {Flex} from '@/components/layout/flex/common';


type Props = InputRowProps & {
  title: React.ReactNode,
  classOfDirectionOverride?: string,
};

export const InputRowWithTitle = ({
  noFixedTitleWidth,
  className,
  title,
  classOfDirectionOverride,
  children,
  ...props
}: React.PropsWithChildren<Props>) => {
  return (
    <InputRow defaultAsCol wrap={false} {...props} className={clsx(
      classOfDirectionOverride ?? 'sm:flex-row',
      className,
    )}>
      <Flex noFullWidth className={clsx(
        'shrink-0 items-center whitespace-nowrap text-sm',
        !noFixedTitleWidth && 'w-32',
      )}>
        {title}
      </Flex>
      {children}
    </InputRow>
  );
};
