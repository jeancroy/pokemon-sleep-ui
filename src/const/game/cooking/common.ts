import {daysInWeek} from '@/const/weekOfDay';
import {cookingMeals} from '@/types/userData/config/cooking/meal';


export const mealsPerWeek = daysInWeek * cookingMeals.length;
