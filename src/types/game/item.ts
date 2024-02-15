import {PokemonId} from '@/types/game/pokemon';


export type ItemId = number;

export type ItemMeta = {
  type: 'regular',
  id: ItemId,
} | {
  type: 'dreamShard' | 'diamond',
} | {
  type: 'pokemonIncense' | 'pokemonCandy',
  pokemonId: PokemonId,
};

export type ItemPack = {
  meta: ItemMeta,
  count: number,
};
