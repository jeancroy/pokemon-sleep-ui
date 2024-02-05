import {getStaminaCookingRecoveryData} from '@/controller/cookingRecovery';
import {getMealMap} from '@/controller/meal';
import {CookingUserSettingsRequiredData} from '@/types/userData/settings/cooking';


export const getCookingUserSettingsRequiredData = async (): Promise<CookingUserSettingsRequiredData> => {
  const [
    mealMap,
    cookingRecoveryData,
  ] = await Promise.all([
    getMealMap(),
    getStaminaCookingRecoveryData(),
  ]);

  return {mealMap, cookingRecoveryData};
};
