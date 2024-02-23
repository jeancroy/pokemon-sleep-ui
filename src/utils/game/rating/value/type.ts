import {Meal} from '@/types/game/meal/main';
import {ProductionSingleParams} from '@/types/game/producing/rate/params';
import {CalculatedCookingConfig} from '@/types/userData/config/cooking/main';


export type RatingValueCommonData = {
  singleParams: ProductionSingleParams,
  calculatedCookingConfig: CalculatedCookingConfig,
  targetMeals: Meal[],
};
