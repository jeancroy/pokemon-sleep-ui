import React from 'react';

import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {SleepdexLookupSortType} from '@/ui/sleepStyle/sleepdex/lookup/filter/type';
import {useSleepdexLookupSortTypeText} from '@/ui/sleepStyle/sleepdex/lookup/sort/text';


type Props = {
  sort: SleepdexLookupSortType,
};

export const SleepdexLookupSortTypeIcon = ({sort}: Props) => {
  const text = useSleepdexLookupSortTypeText(sort);

  if (sort === 'drowsyPowerRequirement' || sort === 'spo') {
    return (
      <GenericIconLarger src="/images/generic/snorlax.png" alt={text} noInvert/>
    );
  }

  if (sort === 'shards') {
    return (
      <GenericIconLarger src="/images/generic/shard.png" alt={text} noInvert/>
    );
  }

  if (sort === 'researchExp') {
    return (
      <GenericIconLarger src="/images/generic/research.png" alt={text} noInvert/>
    );
  }

  if (sort === 'minSnorlaxRank') {
    return (
      <GenericIconLarger src="/images/rank/4.png" alt={text} noInvert/>
    );
  }

  throw new Error(`Unhandled sleepdex sort type of ${sort satisfies never} for icon`);
};
