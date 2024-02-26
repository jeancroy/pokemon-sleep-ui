import {v4} from 'uuid';

import {defaultCommonConstPokeInBox} from '@/const/user/pokebox';
import {TeamMemberData} from '@/types/game/team';
import {PokeInBox} from '@/types/userData/pokebox';


export const toPokeInBox = ({pokemonId, name, ...member}: TeamMemberData): PokeInBox => {
  return {
    ...defaultCommonConstPokeInBox,
    ...member,
    uuid: v4(),
    dateAdded: Date.now(),
    name: name ?? null,
    pokemon: pokemonId,
  };
};
