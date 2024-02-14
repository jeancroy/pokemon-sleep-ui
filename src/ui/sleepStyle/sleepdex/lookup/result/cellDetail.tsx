import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {SnorlaxRankUI} from '@/components/shared/snorlax/rank';
import {SleepdexLookupDataEntry, SleepdexLookupDisplayType} from '@/ui/sleepStyle/sleepdex/lookup/filter/type';
import {SleepdexLookupSortTypeIcon} from '@/ui/sleepStyle/sleepdex/lookup/sort/icon';
import {formatToAbbreviation} from '@/utils/number/format/abbreviation';
import {formatInt} from '@/utils/number/format/regular';


type Props = {
  display: SleepdexLookupDisplayType,
  data: SleepdexLookupDataEntry,
};

export const SleepdexLookupResultCellDetails = ({display, data}: Props) => {
  const {spoRequirement, sleepStyle} = data;

  if (display === 'drowsyPowerRequirement') {
    return (
      <Flex direction="row" center noFullWidth className="gap-1">
        <SleepdexLookupSortTypeIcon sort="drowsyPowerRequirement"/>
        <div>{formatToAbbreviation({num: spoRequirement.drowsyScore, decimals: 2})}</div>
      </Flex>
    );
  }

  if (display === 'spo') {
    return (
      <Flex direction="row" center noFullWidth className="gap-1">
        <SleepdexLookupSortTypeIcon sort="spo"/>
        <div>{formatInt(spoRequirement.spo)}</div>
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

  if (display === 'minSnorlaxRank') {
    return (
      <Flex center noFullWidth>
        {spoRequirement.snorlaxRankMinimum && <SnorlaxRankUI rank={spoRequirement.snorlaxRankMinimum}/>}
      </Flex>
    );
  }

  throw new Error(`Unhandled sleepdex display type of ${display satisfies never} for cell details`);
};
