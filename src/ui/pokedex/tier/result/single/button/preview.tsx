import React from 'react';

import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Flex} from '@/components/layout/flex/common';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
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
          <Flex noFullWidth key={idx}>
            <div className="relative size-12">
              <PokemonImage
                pokemonId={source.pokemon.id}
                image={{type: 'default', image: 'icon'}}
                isShiny={false}
                className="rounded-lg"
              />
              <PokemonIngredientIcons
                ingredients={[source.ingredients]}
                dimension="h-3.5 w-3.5"
                className="absolute bottom-0 w-full justify-center rounded-lg bg-slate-300/50 dark:bg-slate-700/50"
                noQuantity
                noLink
              />
            </div>
          </Flex>
        ))}
      </Flex>
    </AnimatedCollapse>
  );
};
