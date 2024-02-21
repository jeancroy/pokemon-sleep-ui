import React from 'react';

import {isFilterIncludingSome} from '@/components/input/filter/utils/match';
import {Flex} from '@/components/layout/flex/common';
import {PokemonInfo} from '@/types/game/pokemon';
import {PokemonProducingRate} from '@/types/game/producing/rate/main';
import {PokeInBoxTableFrequency} from '@/ui/team/pokebox/content/pokeInBox/table/details/frequency';
import {PokeInBoxTableInfo} from '@/ui/team/pokebox/content/pokeInBox/table/details/info';
import {PokeInBoxTableMaxCarry} from '@/ui/team/pokebox/content/pokeInBox/table/details/maxCarry';
import {PokeInBoxTablePokemon} from '@/ui/team/pokebox/content/pokeInBox/table/details/pokemon';
import {PokeInBoxTableProduction} from '@/ui/team/pokebox/content/pokeInBox/table/details/production';
import {PokeInBoxTableRating} from '@/ui/team/pokebox/content/pokeInBox/table/details/rating';
import {PokeInBoxTableSkills} from '@/ui/team/pokebox/content/pokeInBox/table/details/skills';
import {PokeInBoxTableDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/table/details/type';
import {PokeInBoxViewUnitProps} from '@/ui/team/pokebox/content/pokeInBox/type';
import {PokeboxDisplayType} from '@/ui/team/pokebox/viewer/type';
import {getPokemonProducingParams} from '@/utils/game/producing/params';


type Props = PokeInBoxViewUnitProps & {
  pokemon: PokemonInfo,
  rateOfPokemon: PokemonProducingRate,
};

export const PokeInBoxTableLoadedRow = (props: Props) => {
  const {
    pokemon,
    pokemonProducingParamsMap,
    display,
    onClick,
  } = props;
  const {ratingBasis} = display;

  const detailProps: PokeInBoxTableDetailsProps = {
    ratingBasis,
    pokemonProducingParams: getPokemonProducingParams({
      pokemonId: pokemon.id,
      pokemonProducingParamsMap,
    }),
    ...props,
  };

  return (
    <button className="button-clickable-bg group rounded-lg p-1" onClick={onClick}>
      <Flex direction="row" noFullWidth className="items-center gap-1 [&>*]:shrink-0">
        {isFilterIncludingSome({
          filter: display,
          filterKey: 'displayOfTable',
          ids: ['info'] satisfies PokeboxDisplayType[],
        }) && <PokeInBoxTableInfo {...detailProps}/>}
        {isFilterIncludingSome({
          filter: display,
          filterKey: 'displayOfTable',
          ids: ['pokemon'] satisfies PokeboxDisplayType[],
        }) && <PokeInBoxTablePokemon {...detailProps}/>}
        {isFilterIncludingSome({
          filter: display,
          filterKey: 'displayOfTable',
          ids: ['productionTotal', 'productionBerry', 'productionIngredient'] satisfies PokeboxDisplayType[],
        }) && <PokeInBoxTableProduction {...detailProps}/>}
        {isFilterIncludingSome({
          filter: display,
          filterKey: 'displayOfTable',
          ids: ['rating'] satisfies PokeboxDisplayType[],
        }) && <PokeInBoxTableRating {...detailProps}/>}
        {isFilterIncludingSome({
          filter: display,
          filterKey: 'displayOfTable',
          ids: ['skills'] satisfies PokeboxDisplayType[],
        }) && <PokeInBoxTableSkills {...detailProps}/>}
        {isFilterIncludingSome({
          filter: display,
          filterKey: 'displayOfTable',
          ids: ['frequency'] satisfies PokeboxDisplayType[],
        }) && <PokeInBoxTableFrequency {...detailProps}/>}
        {isFilterIncludingSome({
          filter: display,
          filterKey: 'displayOfTable',
          ids: ['maxCarry'] satisfies PokeboxDisplayType[],
        }) && <PokeInBoxTableMaxCarry {...detailProps}/>}
      </Flex>
    </button>
  );
};
