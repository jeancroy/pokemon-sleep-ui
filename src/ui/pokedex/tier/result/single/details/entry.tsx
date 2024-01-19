import React from 'react';

import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
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
      <PokedexTierListSorterValue basis={sort} value={entry.sorter}/>
    </AnimatedCollapse>
  );
};
