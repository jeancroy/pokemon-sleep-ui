import React from 'react';

import {Grid} from '@/components/layout/grid';
import {PokeboxContentPokeInBoxCell} from '@/ui/team/pokebox/content/pokeInBox/grid/cell';
import {PokeInBoxViewCommonProps} from '@/ui/team/pokebox/content/pokeInBox/type';


export const PokeboxContentPokeInBoxGrid = ({
  filter,
  isIncluded,
  setEditingUuid,
  sortedPokemonInfo,
  ...props
}: PokeInBoxViewCommonProps) => {
  return (
    <Grid className="grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {sortedPokemonInfo.map(({source}) => {
        const uuid = source.extra.uuid;

        // Explicitly checking `false` because the data might not get into the filter data array for check,
        // therefore `isIncluded[pokeInBox.Pokémon]` will be undefined
        if (isIncluded[source.pokemon.id] === false) {
          return <React.Fragment key={uuid}/>;
        }

        return (
          <PokeboxContentPokeInBoxCell
            key={uuid}
            pokeInBox={source.extra}
            displayType={filter.displayType}
            snorlaxFavorite={filter.snorlaxFavorite}
            onClick={() => setEditingUuid(uuid)}
            {...props}
          />
        );
      })}
    </Grid>
  );
};
