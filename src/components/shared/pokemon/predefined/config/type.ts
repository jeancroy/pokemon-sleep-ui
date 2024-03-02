import {PokemonId, PokemonInfo} from '@/types/game/pokemon';
import {IngredientProductionAtLevels} from '@/types/game/pokemon/ingredient';
import {PokemonIndividualParams} from '@/types/game/pokemon/params';
import {ProductionImplicitParams} from '@/types/game/producing/rate/params';


export type PokemonConfigPokemonData = ProductionImplicitParams & PokemonIndividualParams & {
  pokemonId: PokemonId,
  ingredients: IngredientProductionAtLevels,
};

export type PokemonConfigProps = {
  data: PokemonConfigPokemonData,
  onDataUpdated: (update: Partial<PokemonConfigPokemonData>) => void,
  pokemon: PokemonInfo,
  maxEvolutionCount: number,
  showSeeds?: boolean,
};
