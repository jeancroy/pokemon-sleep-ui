import {defaultPokemonEventType} from '@/const/game/pokemon';
import {defaultExpType} from '@/const/game/xp';
import {PokemonInfo} from '@/types/game/pokemon';


export const testPokemonData: {[name in string]: PokemonInfo} = {
  absol: {
    id: 359,
    type: 16,
    specialty: 2,
    sleepType: 4,
    stats: {
      frequency: 3100,
      maxCarry: 14,
      friendshipPoints: 16,
      recruit: {
        exp: 263,
        shards: 556,
      },
      transfer: {
        candy: 5,
      },
    },
    berry: {
      id: 16,
      quantity: 1,
    },
    skill: 1,
    ingredientChain: 359,
    evolution: {
      next: [],
      stage: 1,
      previous: null,
    },
    expType: defaultExpType,
    eventType: defaultPokemonEventType,
    internalId: 91,
  },
  ampharos: {
    id: 181,
    type: 4,
    specialty: 3,
    sleepType: 1,
    stats: {
      frequency: 2500,
      maxCarry: 15,
      friendshipPoints: 20,
      recruit: {
        exp: 397,
        shards: 715,
      },
      transfer: {
        candy: 5,
      },
    },
    berry: {
      id: 4,
      quantity: 1,
    },
    skill: 2,
    ingredientChain: 181,
    evolution: {
      next: [],
      stage: 3,
      previous: 180,
    },
    expType: defaultExpType,
    eventType: defaultPokemonEventType,
    internalId: 82,
  },
};

export const testPokemonList: PokemonInfo[] = Object.values(testPokemonData);
