import {Meal} from '@/types/game/meal/main';
import {ProductionIndividualParams} from '@/types/game/producing/rate/params';
import {CalculatedCookingConfig} from '@/types/userData/config/cooking/main';


export type RatingValueCommonData = {
  individual: ProductionIndividualParams,
  calculatedCookingConfig: CalculatedCookingConfig,
  targetMeals: Meal[],
};
