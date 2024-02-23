import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {PokemonProduction} from '@/types/game/producing/rate/main';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';


export type PokeInBoxTableDetailsProps = PokeInBoxCommonProps & {
  isLevelPreview: boolean,
  rateOfPokemon: PokemonProduction,
  display: PokeboxViewerDisplay,
  pokemonProducingParams: PokemonProducingParams,
};
