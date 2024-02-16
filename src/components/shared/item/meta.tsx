import React from 'react';

import {useTranslations} from 'next-intl';

import {DiamondIcon} from '@/components/shared/icon/diamond';
import {DreamShardIcon} from '@/components/shared/icon/dreamShard';
import {ItemIcon} from '@/components/shared/icon/item';
import {PokemonCandyIcon} from '@/components/shared/icon/pokemon/candy';
import {PokemonIncenseIcon} from '@/components/shared/icon/pokemon/incense';
import {ItemMetaLayout} from '@/components/shared/item/metaLayout';
import {ItemMetaCommonProps} from '@/components/shared/item/type';


export const ItemMetaUI = ({pokedexMap, itemPack, dimension = 'size-6'}: ItemMetaCommonProps) => {
  const {meta} = itemPack;
  const {type} = meta;

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.Common');

  if (type === 'regular') {
    const {id} = meta;
    const name = t(`Item.${id}`);

    return (
      <ItemMetaLayout name={name}>
        <ItemIcon itemId={id} alt={name} dimension={dimension} noInvert className="scale-125"/>
      </ItemMetaLayout>
    );
  }

  if (type === 'diamond') {
    const name = t2('Diamond');

    return (
      <ItemMetaLayout name={name}>
        <DiamondIcon dimension={dimension} alt={name} className="scale-125"/>
      </ItemMetaLayout>
    );
  }

  if (type === 'dreamShard') {
    const name = t2('DreamShards');

    return (
      <ItemMetaLayout name={name}>
        <DreamShardIcon dimension={dimension} alt={t2('DreamShards')} className="scale-125"/>
      </ItemMetaLayout>
    );
  }

  if (type === 'pokemonIncense') {
    const pokemon = pokedexMap[meta.pokemonId];

    if (!pokemon) {
      return null;
    }

    const name = t(`PokemonName.${pokemon.id}`);

    return (
      <ItemMetaLayout name={name}>
        <PokemonIncenseIcon pokemonType={pokemon.type} dimension={dimension} alt={name}/>
      </ItemMetaLayout>
    );
  }

  if (type === 'pokemonCandy') {
    const pokemon = pokedexMap[meta.pokemonId];

    if (!pokemon) {
      return null;
    }

    const name = t(`PokemonCandy.${pokemon.evolution.initial}`);

    return (
      <ItemMetaLayout name={name}>
        <PokemonCandyIcon pokemon={pokemon} dimension={dimension} alt={name} className="scale-150"/>
      </ItemMetaLayout>
    );
  }


  throw new Error(`Unhandled item type [${type satisfies never}] for rendering item pack info`);
};
