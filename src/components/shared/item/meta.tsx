import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {DiamondIcon} from '@/components/shared/icon/diamond';
import {ItemIcon} from '@/components/shared/icon/item';
import {PokemonCandyIcon} from '@/components/shared/icon/pokemon/candy';
import {PokemonIncenseIcon} from '@/components/shared/icon/pokemon/incense';
import {ItemPackCommonProps} from '@/components/shared/item/type';


export const ItemMetaUI = ({pokedexMap, itemPack, dimension = 'size-6'}: ItemPackCommonProps) => {
  const {meta} = itemPack;
  const {type} = meta;

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.Common');

  if (type === 'regular') {
    const {id} = meta;
    const name = t(`Item.${id}`);

    return (
      <Flex noFullWidth direction="row" className="items-center gap-1">
        <ItemIcon itemId={id} alt={name} dimension={dimension} noInvert/>
        <span>{name}</span>
      </Flex>
    );
  }

  if (type === 'diamond') {
    return <DiamondIcon dimension={dimension} alt={t2('Diamond')}/>;
  }

  if (type === 'dreamShard') {
    return <DiamondIcon dimension={dimension} alt={t2('DreamShards')}/>;
  }

  if (type === 'pokemonIncense') {
    const pokemon = pokedexMap[meta.pokemonId];

    if (!pokemon) {
      return null;
    }

    return (
      <PokemonIncenseIcon
        pokemonType={pokemon.type}
        dimension={dimension}
        alt={t(`PokemonType.${pokemon.type}`)}
      />
    );
  }

  if (type === 'pokemonCandy') {
    const pokemon = pokedexMap[meta.pokemonId];

    if (!pokemon) {
      return null;
    }

    return (
      <PokemonCandyIcon
        pokemon={pokemon}
        dimension={dimension}
        alt={t(`PokemonCandy.${pokemon.evolution.initial}`)}
      />
    );
  }


  throw new Error(`Unhandled item type [${type satisfies never}] for rendering item pack info`);
};
