import {MealMakerRecipeInfo, MealMakerRecipeSingleProps} from '@/ui/cooking/make/recipe/type';


export type MealMakerRecipePartsProps = MealMakerRecipeInfo & MealMakerRecipeSingleProps & {
  mealName: string,
  isInventoryUnset: boolean,
};
