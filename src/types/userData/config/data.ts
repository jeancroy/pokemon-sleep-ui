import {EventStrengthMultiplierData} from '@/types/game/event/strengthMultiplier';
import {MealMap} from '@/types/game/meal/main';
import {StaminaCookingRecoveryData} from '@/types/game/stamina/recovery';


export type CalculatedCookingConfigRequiredData = {
  mealMap: MealMap,
  cookingRecoveryData: StaminaCookingRecoveryData[],
};

export type UserMultiplierConfigRequiredData = {
  eventStrengthMultiplierData: EventStrengthMultiplierData,
};

export type ConfigRequiredData = CalculatedCookingConfigRequiredData & UserMultiplierConfigRequiredData;
