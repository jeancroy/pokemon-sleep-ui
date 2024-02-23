import {FilterWithUpdaterProps} from '@/components/input/filter/type';
import {MealId} from '@/types/game/meal/main';
import {PokemonProducingItem} from '@/types/game/pokemon/producing';
import {MealMakerPopupCommonProps} from '@/ui/cooking/make/recipe/popup/type';
import {MealMakerFilter, MealMakerRecipeData} from '@/ui/cooking/make/type';


export type MealMakerRecipeSingleProps =
  MealMakerRecipeData &
  FilterWithUpdaterProps<MealMakerFilter> &
  MealMakerPopupCommonProps & {
    showUnmakeableRecipe: boolean,
    isInventoryUnset: boolean,
  };

export type MealMakerRecipeInfo = {
  ingredientSetReady: {[id in MealId]: number},
  ingredientsMissing: PokemonProducingItem<number>[],
  isMealMakeable: boolean,
  mealsReady: number,
};
