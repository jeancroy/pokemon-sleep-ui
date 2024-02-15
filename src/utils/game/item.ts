import React from 'react';

import {ItemPack} from '@/types/game/item';


export const getItemPackKey = ({meta, count}: ItemPack): React.Key => {
  const {type} = meta;

  if (type === 'regular') {
    return `${type}-${meta.id}x${count}`;
  }

  if (type === 'dreamShard' || type === 'diamond') {
    return `${type}x${count}`;
  }

  if (type === 'pokemonIncense' || type === 'pokemonCandy') {
    return `${type}@${meta.pokemonId}x${count}`;
  }

  throw new Error(`Unhandled item type [${type satisfies never}] to get item pack key`);
};
