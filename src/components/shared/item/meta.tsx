import React from 'react';

import {useTranslations} from 'next-intl';

import {DiamondIcon} from '@/components/shared/icon/diamond';
import {DreamShardIcon} from '@/components/shared/icon/dreamShard';
import {ItemIcon} from '@/components/shared/icon/item';
import {PokemonCandyIcon} from '@/components/shared/icon/pokemon/candy';
import {PokemonIncenseIcon} from '@/components/shared/icon/pokemon/incense';
import {ItemMetaLayout} from '@/components/shared/item/metaLayout';
import {ItemMetaCommonProps} from '@/components/shared/item/type';
import {PokemonImage} from '@/components/shared/pokemon/image/main';


export const ItemMetaUI = ({
  pokedexMap,
  itemPack,
  dimension = 'size-6',
  hideName = false,
}: ItemMetaCommonProps) => {
  const {meta} = itemPack;
  const {type} = meta;

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.Common');

  if (type === 'regular') {
    const {id} = meta;
    const name = t(`Item.${id}`);

    return (
      <ItemMetaLayout name={name} hideName={hideName}>
        <ItemIcon itemId={id} alt={name} dimension={dimension} noInvert className="scale-125"/>
      </ItemMetaLayout>
    );
  }

  if (type === 'diamond') {
    const name = t2('Diamond');

    return (
      <ItemMetaLayout name={name} hideName={hideName}>
        <DiamondIcon dimension={dimension} alt={name} className="scale-125"/>
      </ItemMetaLayout>
    );
  }

  if (type === 'dreamShard') {
    const name = t2('DreamShards');

    return (
      <ItemMetaLayout name={name} hideName={hideName}>
        <DreamShardIcon dimension={dimension} alt={t2('DreamShards')} className="scale-125"/>
      </ItemMetaLayout>
    );
  }

  if (type === 'pokemonIncense') {
    const pokemon = pokedexMap[meta.pokemonId];

    if (!pokemon) {
      return null;
    }

    const name = t(`PokemonIncense.${pokemon.id}`);

    return (
      <ItemMetaLayout name={name} hideName={hideName}>
        <div className="relative size-5">
          <PokemonImage
            pokemonId={pokemon.id}
            image={{type: 'default', image: 'icon'}}
            isShiny={false}
            className="rounded-full"
          />
        </div>
        <PokemonIncenseIcon pokemonType={pokemon.type} dimension={dimension} alt={name} className="scale-125"/>
      </ItemMetaLayout>
    );
  }

  if (type === 'pokemonCandy') {
    const pokemon = pokedexMap[meta.pokemonId];

    if (!pokemon) {
      return null;
    }

    const name = t(`PokemonCandy.${pokemon.candy.i18nId}`);

    return (
      <ItemMetaLayout name={name} hideName={hideName}>
        <PokemonCandyIcon pokemon={pokemon} dimension={dimension} alt={name} className="scale-150"/>
      </ItemMetaLayout>
    );
  }


  throw new Error(`Unhandled item type [${type satisfies never}] for rendering item pack info`);
};
