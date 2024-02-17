import {ItemId} from '@/types/game/item';
import {PokemonId} from '@/types/game/pokemon';
import {PokemonGender} from '@/types/game/pokemon/gender';


export type EvolutionCondition = {
  type: 'level',
  level: number,
} | {
  type: 'candy',
  count: number,
} | {
  type: 'item',
  item: ItemId,
} | {
  type: 'sleepTime',
  hours: number,
} | {
  type: 'timing',
  startHour: number,
  endHour: number,
} | {
  type: 'gender',
  gender: PokemonGender,
};

export type EvolutionBranch = {
  id: PokemonId,
  conditions: EvolutionCondition[],
};

export type EvolutionData = {
  next: EvolutionBranch[],
} & ({
  stage: 1,
  previous: null,
} | {
  stage: 2 | 3,
  previous: PokemonId,
});

export type EvolutionStage = EvolutionData['stage'];
