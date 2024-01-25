import React from 'react';

import {clsx} from 'clsx';

import {infoIconStyleClass} from '@/components/icons/const';
import {InfoIconStyle} from '@/components/icons/type';
import {Flex} from '@/components/layout/flex/common';
import {Dimension} from '@/types/style';


type Props = {
  className?: string,
  classTextSize?: `text-${string}`,
  dimension?: Dimension,
  style?: InfoIconStyle,
};

export const InfoIcon = ({className, classTextSize, dimension, style, children}: React.PropsWithChildren<Props>) => {
  return (
    <Flex center noFullWidth className={clsx(
      classTextSize ?? 'text-xs',
      dimension ?? 'size-5',
      style ? infoIconStyleClass[style] : infoIconStyleClass.normal,
      className,
    )}>
      {children}
    </Flex>
  );
};
