import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {SleepdexLookupDataEntry, SleepdexLookupDisplayType} from '@/ui/sleepStyle/sleepdex/lookup/filter/type';
import {SleepdexLookupSortTypeIcon} from '@/ui/sleepStyle/sleepdex/lookup/sort/icon';
import {formatInt, formatToAbbreviation} from '@/utils/number/format';


type Props = {
  display: SleepdexLookupDisplayType,
  data: SleepdexLookupDataEntry,
};

export const SleepdexLookupResultCellDetails = ({display, data}: Props) => {
  const {spoRequirement, sleepStyle} = data;

  if (display === 'drowsyPowerRequirements') {
    return (
      <Flex direction="row" center noFullWidth className="gap-1">
        <SleepdexLookupSortTypeIcon sort="drowsyPowerRequirements"/>
        <div>{formatToAbbreviation({num: spoRequirement.drowsyScore, decimals: 2})}</div>
      </Flex>
    );
  }

  if (display === 'shards') {
    return (
      <Flex direction="row" center noFullWidth className="gap-1">
        <SleepdexLookupSortTypeIcon sort="shards"/>
        <div>{formatInt(sleepStyle.rewards.shards)}</div>
      </Flex>
    );
  }

  if (display === 'researchExp') {
    return (
      <Flex direction="row" center noFullWidth className="gap-1">
        <SleepdexLookupSortTypeIcon sort="researchExp"/>
        <div>{formatInt(sleepStyle.rewards.exp)}</div>
      </Flex>
    );
  }

  throw new Error(`Unhandled sleepdex display type of ${display satisfies never} for cell details`);
};
