import {IngredientId} from '@/types/game/ingredient';
import {IngredientLevel} from '@/types/game/pokemon/ingredient';


export type PokemonIngredientFromPacket = {
  pokemonUniqueId: number,
  pokemonId: number,
  ingredientLevel: IngredientLevel,
  ingredientId: IngredientId,
  ingredientQuantity: number,
};
