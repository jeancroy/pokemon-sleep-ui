import React from 'react';

import {LoadingText} from '@/components/icons/loading';
import {Flex} from '@/components/layout/flex/common';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {PokeInBoxTableRowHeader} from '@/ui/team/pokebox/content/pokeInBox/table/header';
import {PokeInBoxTableLoadedRow} from '@/ui/team/pokebox/content/pokeInBox/table/row/loaded';
import {PokeInBoxViewUnitProps} from '@/ui/team/pokebox/content/pokeInBox/type';
import {useCalculatePokeInBoxProduction} from '@/ui/team/pokebox/content/pokeInBox/worker/production/hook';


export const PokeInBoxTableRow = (props: PokeInBoxViewUnitProps) => {
  const {pokeInBox, display} = props;
  const {ratingBasis} = display;

  const {pokedexMap} = useCommonServerData();

  const pokemon = pokedexMap[pokeInBox.pokemon];
  const {loading, rate} = useCalculatePokeInBoxProduction({
    pokemon,
    ratingBasis,
    ...props,
  });

  if (!pokemon) {
    return null;
  }

  return (
    <Flex direction="row" className="gap-1">
      {/* `pokemon` comes later because `props` from upstream could contain `pokemon` as list of Pokémon */}
      <PokeInBoxTableRowHeader {...props} pokemon={pokemon}/>
      {loading && <LoadingText className="px-1.5"/>}
      {!loading && !!rate && <PokeInBoxTableLoadedRow pokemon={pokemon} rateOfPokemon={rate} {...props}/>}
    </Flex>
  );
};
