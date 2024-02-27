import {PokemonConfigPokemonData} from '@/components/shared/pokemon/predefined/config/type';
import {IndexableNonSymbol} from '@/utils/type';


export type TeamMemberKey = IndexableNonSymbol;

export type TeamMemberData = PokemonConfigPokemonData & {
  name?: string | null,
  alwaysFullPack?: boolean | null,
  linkedPokeInBoxUuid: string | null,
};
