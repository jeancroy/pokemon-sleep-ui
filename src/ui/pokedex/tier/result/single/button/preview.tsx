import React from 'react';

import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Flex} from '@/components/layout/flex/common';
import {PokemonIconWithIngredients} from '@/components/shared/pokemon/icon/withIngredients';
import {pokedexTierListPokemonPreviewCount} from '@/ui/pokedex/tier/result/single/const';
import {PokedexTierListSingleCommonProps} from '@/ui/pokedex/tier/result/single/type';


type Props = PokedexTierListSingleCommonProps & {
  show: boolean,
};

export const PokedexTierListPreview = ({bucket, show}: Props) => {
  return (
    <AnimatedCollapse show={show}>
      <Flex direction="row" center noFullWidth wrap className="gap-2">
        {bucket.slice(0, pokedexTierListPokemonPreviewCount).map(({source}, idx) => (
          <PokemonIconWithIngredients
            key={idx}
            pokemon={source.pokemon.id}
            ingredients={source.ingredients}
          />
        ))}
      </Flex>
    </AnimatedCollapse>
  );
};
