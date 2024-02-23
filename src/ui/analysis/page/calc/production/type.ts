import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {ProductionByCalculatedStates} from '@/types/game/producing/rate/base';
import {PokemonProduction} from '@/types/game/producing/rate/main';


export type ProductionOfPokemon = {
  pokemon: PokemonInfo,
  rate: PokemonProduction,
};

export type ProductionOfBerryOnPokemon = {
  pokemon: PokemonInfo,
  rate: ProductionByCalculatedStates,
};

export type ProductionOfIngredientsOnPokemon = {
  pokemon: PokemonInfo,
  productions: IngredientProduction[],
  // Grouped productions are mainly used for comparison
  productionsGrouped: IngredientProduction[],
  rates: ProductionByCalculatedStates[],
};

export type PokemonAnalysisRateInfo = {
  pokemon: PokemonInfo,
  productions: IngredientProduction[],
  rate: PokemonProduction,
};
