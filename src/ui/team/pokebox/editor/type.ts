import {PokemonId} from '@/types/game/pokemon';
import {PokeInBox} from '@/types/userData/pokebox';
import {PokeboxServerDataProps} from '@/ui/team/pokebox/type';


export type PokeInBoxEditCommonProps = PokeboxServerDataProps & {
  onRemovePokeInBox: (toRemove: PokeInBox['uuid']) => void,
};

export type PokeInBoxEditStateProps = {
  pokeInBox: PokeInBox,
  setPokeInBox: (newPokeInBox: PokeInBox) => void,
};

export type PokeInBoxEditorState = {
  action: 'create',
  pokemonId: PokemonId,
} | {
  action: 'update',
  uuid: PokeInBox['uuid'],
};
