import {PokemonNameSize} from '@/components/shared/pokemon/name/type';
import {Dimension} from '@/types/style';


export const pokemonNameWrapperStyling: {[size in PokemonNameSize]: string} = {
  lg: 'gap-1 p-2.5 text-2xl',
  base: 'gap-1 text-lg',
  sm: 'gap-0.5',
  xs: 'gap-0.5 text-sm',
};

export const pokemonNameIconSize: {[size in PokemonNameSize]: Dimension} = {
  lg: 'size-8',
  base: 'size-6',
  sm: 'size-5',
  xs: 'size-4',
};

export const pokemonNameIdStyling: {[size in PokemonNameSize]: string} = {
  lg: 'text-sm',
  base: 'text-sm',
  sm: 'text-xs',
  xs: 'text-xs',
};
