import {Meal} from '@/types/game/meal/main';
import {ProducingRateSingleParams} from '@/types/game/producing/rate/params';
import {CalculatedCookingConfig} from '@/types/userData/config/cooking/main';


export type RatingValueCommonData = {
  singleParams: ProducingRateSingleParams,
  calculatedCookingConfig: CalculatedCookingConfig,
  targetMeals: Meal[],
};
