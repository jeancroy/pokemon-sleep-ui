import {PokedexMap, PokemonId, PokemonInfo} from '@/types/game/pokemon';
import {IngredientChainMap, IngredientProductionAtLevels} from '@/types/game/pokemon/ingredient';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonSubSkill, SubSkillMap} from '@/types/game/pokemon/subSkill';
import {ProducingRateImplicitParams} from '@/types/game/producing/rate/params';


export type PokemonConfigPokemonData = ProducingRateImplicitParams & {
  level: number,
  pokemonId: PokemonId,
  ingredients: IngredientProductionAtLevels,
  nature: NatureId | null,
  subSkill: PokemonSubSkill,
};

export type PokemonConfigProps = {
  data: PokemonConfigPokemonData,
  onDataUpdated: (update: Partial<PokemonConfigPokemonData>) => void,
  pokemon: PokemonInfo,
  pokedexMap: PokedexMap,
  ingredientChainMap: IngredientChainMap,
  subSkillMap: SubSkillMap,
  pokemonMaxLevel: number,
  maxEvolutionCount: number,
  showSeeds?: boolean,
};
