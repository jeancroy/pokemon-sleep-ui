import {PokemonInputFilter} from '@/components/shared/pokemon/filter/type';
import {PokemonInfo} from '@/types/game/pokemon';
import {PokeInBox} from '@/types/userData/pokebox';


export type PokeboxImporterCommonProps = {
  onPokeboxPicked: (pokeInBox: PokeInBox) => void,
  isPokeInBoxIncluded?: (pokeInBox: PokeInBox) => boolean,
};

export type PokeInBoxForFilter = Omit<PokeInBox, 'name' | 'pokemon'> & {
  name: string,
  search: string[],
  pokemon: PokemonInfo,
};

export type PokeboxImporterFilter = PokemonInputFilter & {
  name: string,
};
