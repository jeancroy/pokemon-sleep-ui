import {getStaminaCookingRecoveryData} from '@/controller/cookingRecovery';
import {getEventStrengthMultiplierData} from '@/controller/event/strengthMultiplier';
import {getMealMap} from '@/controller/meal';
import {ConfigRequiredData} from '@/types/userData/config/data';


export const getConfigRequiredData = async (): Promise<ConfigRequiredData> => {
  const [
    mealMap,
    cookingRecoveryData,
    eventStrengthMultiplierData,
  ] = await Promise.all([
    getMealMap(),
    getStaminaCookingRecoveryData(),
    getEventStrengthMultiplierData(),
  ]);

  return {mealMap, cookingRecoveryData, eventStrengthMultiplierData};
};
