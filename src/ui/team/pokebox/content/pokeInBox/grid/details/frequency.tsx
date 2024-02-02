import React from 'react';

import {LoadingText} from '@/components/icons/loading';
import {PokemonFrequencyFromProducingRate} from '@/components/shared/pokemon/frequency/fromRate';
import {PokeInBoxGridDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/grid/details/type';
import {useCalculatePokeInBoxProduction} from '@/ui/team/pokebox/content/pokeInBox/worker/production/hook';


export const PokeInBoxGridFrequency = (props: PokeInBoxGridDetailsProps) => {
  const {loading, rate} = useCalculatePokeInBoxProduction(props);

  if (loading || !rate) {
    return <LoadingText dimension="size-4"/>;
  }

  return <PokemonFrequencyFromProducingRate pokemonRate={rate} normalText/>;
};
