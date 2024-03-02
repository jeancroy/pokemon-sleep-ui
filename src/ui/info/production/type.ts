import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {PokemonInfo} from '@/types/game/pokemon';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';


export type ProducingParamsDataProps = UsePokemonFilterCommonData & {
  pokemonList: PokemonInfo[],
  pokemonProducingParamsMap: PokemonProducingParamsMap,
};
