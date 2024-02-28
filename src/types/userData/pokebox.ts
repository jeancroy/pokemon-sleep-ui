import {PokemonId} from '@/types/game/pokemon';
import {IngredientProductionAtLevels} from '@/types/game/pokemon/ingredient';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonSubSkill} from '@/types/game/pokemon/subSkill';
import {ProductionImplicitParams} from '@/types/game/producing/rate/params';
import {Migratable} from '@/types/migrate';


export type PokeInBox = Migratable & ProductionImplicitParams & {
  uuid: string,
  dateAdded: number,
  pokemon: PokemonId,
  name: string | null,
  level: number,
  ingredients: IngredientProductionAtLevels,
  subSkill: PokemonSubSkill,
  nature: NatureId | null,
  isShiny: boolean,
  isFavorite: boolean,
};

export type Pokebox = {[uuid in string]?: PokeInBox};
