import {MealTypeId} from '@/types/game/meal';
import {CookingFilterIngredientCount, CookingFilterRecipeLevel} from '@/ui/cooking/type';
import {PokedexDisplay} from '@/ui/pokedex/index/type';
import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';


export type UserPreloadedContent = {
  mealType: MealTypeId | null,
  recipeLevel: CookingFilterRecipeLevel,
  pokedex: PokedexDisplay,
  pokeboxDisplay: PokeboxViewerDisplay,
  potCapacity: number,
  ingredientCount: CookingFilterIngredientCount,
};
