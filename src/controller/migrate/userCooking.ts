import {defaultCookingConfig} from '@/const/user/config/cooking';
import {createUserDataManager} from '@/controller/user/common';
import {userDataCookingConfig} from '@/controller/user/manager';
import {RecipeLevel} from '@/types/game/cooking';
import {IngredientCounter} from '@/types/game/ingredient';
import {MealTypeId} from '@/types/game/meal/main';
import {CookingConfig} from '@/types/userData/config/cooking/main';


const userDataRecipeLevel = createUserDataManager<RecipeLevel>('recipeLevel');

const userDataPotCapacity = createUserDataManager<number>('potCapacity');

const userDataMealType = createUserDataManager<MealTypeId>('mealType');

const userDataIngredientCount = createUserDataManager<IngredientCounter>('ingredientCount');

export const migrateUserCookingSettings = async (userId: string) => {
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

  const newPreset: CookingConfig = {
    ...defaultCookingConfig,
    mealType: mealType?.data ?? defaultCookingConfig.mealType,
    recipeLevel: recipeLevel?.data ?? defaultCookingConfig.recipeLevel,
    potCapacity: potCapacity?.data ?? defaultCookingConfig.potCapacity,
    ingredientCount: ingredientCount?.data ?? defaultCookingConfig.ingredientCount,
  };

  await userDataCookingConfig.setData(userId, newPreset);
};
