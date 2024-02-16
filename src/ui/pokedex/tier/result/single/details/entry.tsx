import React from 'react';

import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Flex} from '@/components/layout/flex/common';
import {PokedexCalcResultEntry} from '@/ui/pokedex/common/calc/type';
import {PokedexTierListInput} from '@/ui/pokedex/tier/input/type';
import {PokedexTierListSorterValue} from '@/ui/pokedex/tier/result/single/details/common/sorterValue';


type Props = {
  input: PokedexTierListInput,
  entry: PokedexCalcResultEntry,
};

export const PokedexTierListEntryDetails = ({input, entry}: Props) => {
  const {filter, showDetails} = input;
  const {sort} = filter;

  return (
    <AnimatedCollapse show={showDetails}>
      <Flex className="mt-1.5">
        <PokedexTierListSorterValue basis={sort} value={entry.sorter}/>
      </Flex>
    </AnimatedCollapse>
  );
};
