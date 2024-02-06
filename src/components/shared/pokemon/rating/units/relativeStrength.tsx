import React from 'react';

import ArrowsUpDownIcon from '@heroicons/react/24/outline/ArrowsUpDownIcon';
import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {getNumberStyles} from '@/styles/text/number';
import {Dimension} from '@/types/style';
import {formatSignedNumber} from '@/utils/number/format/signed';


type Props = {
  baseDiffPercent: number,
  iconDimension?: Dimension,
  noFullWidth?: boolean,
  className?: string,
};

export const RatingRelativeStrength = ({baseDiffPercent, iconDimension, noFullWidth, className}: Props) => {
  return (
    <Flex direction="row" center noFullWidth={noFullWidth ?? true} className={clsx(
      'group gap-1 whitespace-nowrap',
      getNumberStyles({num: baseDiffPercent}),
      className,
    )}>
      <ArrowsUpDownIcon className={iconDimension ?? 'size-4'}/>
      <div>
        {formatSignedNumber({format: 'float', num: baseDiffPercent}) ?? '-'}%
      </div>
    </Flex>
  );
};
