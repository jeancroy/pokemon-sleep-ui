import {FilterWithUpdaterProps} from '@/components/input/filter/type';
import {MealId} from '@/types/game/meal/main';
import {PokemonProducingItem} from '@/types/game/pokemon/producing';
import {CookingPopupCommonProps} from '@/ui/cooking/recipe/popup/type';
import {CookingFilter, CookingRecipeData} from '@/ui/cooking/type';


export type CookingRecipeSingleProps =
  CookingRecipeData &
  FilterWithUpdaterProps<CookingFilter> &
  CookingPopupCommonProps & {
    showUnmakeableRecipe: boolean,
  };

export type CookingRecipeInfo = {
  ingredientSetReady: {[id in MealId]: number},
  ingredientsMissing: PokemonProducingItem<number>[],
  isMealMakeable: boolean,
  mealsReady: number,
};