import {Filter} from 'mongodb';

import {GetEventInfoListOpts} from '@/controller/event/info';
import {PokemonId} from '@/types/game/pokemon';
import {ActivationPropertiesAtClient} from '@/types/mongo/activation';
import {PokeInBoxData} from '@/types/mongo/pokebox/main';


export type UserDataLoadingOpts = {
  type: 'teamAnalysisMember',
  opts: {
    teamMemberId: string,
  },
} | {
  type: 'productionComparisonTarget',
  opts: {
    targetUuid: string,
  },
} | {
  type: 'pokeboxSingle',
  opts: {
    pokeInBoxUuid: string,
  },
} | {
  type: 'pokeboxSorted',
  opts?: never,
} | {
  type: 'pokeboxWithFilter',
  opts: Filter<PokeInBoxData>,
} | {
  type: 'sleepdex',
  opts?: never,
} | {
  type: 'sleepdexOfPokemon',
  opts: {
    pokemonId: PokemonId,
  },
} | {
  type: 'ratingConfig',
  opts?: never,
} | {
  type: 'eventList',
  opts: GetEventInfoListOpts,
} | {
  type: 'adminActivationCreate',
  opts: ActivationPropertiesAtClient,
} | {
  type: 'adminActivationCheck',
  opts: {
    key: string,
    userId: string,
  },
} | {
  type: 'buildId',
  opts?: never,
};
