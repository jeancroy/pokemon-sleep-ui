import {Pokebox, PokeInBox} from '@/types/userData/pokebox';


export const toPokebox = (pokeInBoxList: PokeInBox[]): Pokebox => (
  Object.fromEntries(pokeInBoxList.map((pokeInBox) => [pokeInBox.uuid, pokeInBox]))
);
