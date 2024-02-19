import {MealId, MealTypeId} from '@/types/game/meal/main';
import {CookingMeal} from '@/types/userData/config/cooking/meal';


export type CookingTargetOfType = {[meal in CookingMeal]?: MealId | null};

export type CookingTarget = {[mealType in MealTypeId]?: CookingTargetOfType};
