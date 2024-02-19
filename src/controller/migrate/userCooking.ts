import {defaultUserCookingSettings} from '@/const/user/cooking';
import {createUserDataManager} from '@/controller/user/common';
import {userDataCookingSettings} from '@/controller/user/manager';
import {RecipeLevel} from '@/types/game/cooking';
import {IngredientCounter} from '@/types/game/ingredient';
import {MealTypeId} from '@/types/game/meal/main';
import {UserCookingSettings} from '@/types/userData/settings/cooking/settings';


const userDataRecipeLevel = createUserDataManager<RecipeLevel>('recipeLevel');

const userDataPotCapacity = createUserDataManager<number>('potCapacity');

const userDataMealType = createUserDataManager<MealTypeId>('mealType');

const userDataIngredientCount = createUserDataManager<IngredientCounter>('ingredientCount');

export const migrateUserCookingData = async (userId: string) => {
  const [
    mealType,
    recipeLevel,
    potCapacity,
    ingredientCount,
  ] = await Promise.all([
    userDataMealType.getData(userId),
    userDataRecipeLevel.getData(userId),
    userDataPotCapacity.getData(userId),
    userDataIngredientCount.getData(userId),
  ]);

  const newPreset: UserCookingSettings = {
    ...defaultUserCookingSettings,
    mealType: mealType?.data ?? defaultUserCookingSettings.mealType,
    recipeLevel: recipeLevel?.data ?? defaultUserCookingSettings.recipeLevel,
    potCapacity: potCapacity?.data ?? defaultUserCookingSettings.potCapacity,
    ingredientCount: ingredientCount?.data ?? defaultUserCookingSettings.ingredientCount,
  };

  await userDataCookingSettings.setData(userId, newPreset);
};
