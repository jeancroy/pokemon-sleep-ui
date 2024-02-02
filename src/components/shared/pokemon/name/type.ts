import {PokemonInfo} from '@/types/game/pokemon';


export type PokemonNameSize = 'lg' | 'base' | 'sm' | 'xs';

export type PokemonNameProps = {
  pokemon: PokemonInfo,
  override?: string | null,
  className?: string,
};
