import {getStaminaCookingRecoveryData} from '@/controller/cookingRecovery';
import {getEventStrengthMultiplierData} from '@/controller/event/strengthMultiplier';
import {getMealMap} from '@/controller/meal';
import {UserSettingsRequiredData} from '@/types/userData/settings/main';


export const getUserSettingsRequiredData = async (): Promise<UserSettingsRequiredData> => {
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
