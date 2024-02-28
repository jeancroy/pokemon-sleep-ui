import {PokedexMap, PokemonId, PokemonInfo} from '@/types/game/pokemon';
import {IngredientChainMap, IngredientProductionAtLevels} from '@/types/game/pokemon/ingredient';
import {MainSkillMap} from '@/types/game/pokemon/mainSkill';
import {PokemonIndividualParams} from '@/types/game/pokemon/params';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {ProductionImplicitParams} from '@/types/game/producing/rate/params';


export type PokemonConfigPokemonData = ProductionImplicitParams & PokemonIndividualParams & {
  pokemonId: PokemonId,
  ingredients: IngredientProductionAtLevels,
};

export type PokemonConfigProps = {
  data: PokemonConfigPokemonData,
  onDataUpdated: (update: Partial<PokemonConfigPokemonData>) => void,
  pokemon: PokemonInfo,
  pokedexMap: PokedexMap,
  ingredientChainMap: IngredientChainMap,
  mainSkillMap: MainSkillMap,
  subSkillMap: SubSkillMap,
  pokemonMaxLevel: number,
  maxEvolutionCount: number,
  showSeeds?: boolean,
};
