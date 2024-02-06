import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {formatToAbbreviation} from '@/utils/number/format/abbreviation';
import {formatInt} from '@/utils/number/format/regular';


type Props = {
  rank: number,
  samples: number,
  noFullWidth?: boolean,
  classTextOfRank?: `text-${string}`,
  className?: string,
};

export const RatingResultRank = ({rank, samples, noFullWidth, classTextOfRank, className}: Props) => {
  return (
    <Flex direction="row" noFullWidth={noFullWidth ?? true} className={clsx('items-end gap-0.5', className)}>
      <div className={classTextOfRank}>{rank ? formatInt(rank) : '-'}</div>
      <div>/</div>
      <div className="whitespace-nowrap">
        {isNaN(samples) ? '-' : formatToAbbreviation({num: samples})}
      </div>
    </Flex>
  );
};
