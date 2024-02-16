import React from 'react';

import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {Flex} from '@/components/layout/flex/common';
import {PokedexTierListSorterValue} from '@/ui/pokedex/tier/result/single/details/common/sorterValue';
import {PokedexTierListSingleCommonProps} from '@/ui/pokedex/tier/result/single/type';


export const PokedexTierListTierDetails = ({input, bucket}: PokedexTierListSingleCommonProps) => {
  const {filter, showDetails} = input;
  const {sort} = filter;

  const sorters = bucket.map(({sorter}) => sorter);

  return (
    <AnimatedCollapseQuick show={showDetails}>
      <Flex direction="row" center className="mt-1.5 gap-1">
        <PokedexTierListSorterValue basis={sort} value={Math.min(...sorters)}/>
        <span>~</span>
        <PokedexTierListSorterValue basis={sort} value={Math.max(...sorters)}/>
      </Flex>
    </AnimatedCollapseQuick>
  );
};
