import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {getCookingUserSettingsRequiredData} from '@/controller/dataBundle/cookingSettings';
import {getIngredientMap} from '@/controller/ingredient';
import {getRecipeLevelData} from '@/controller/recipeLevel';
import {CookingServerDataProps} from '@/ui/cooking/common/type';
import {createUserSettingsBundle} from '@/utils/user/settings/create';


export const getCookingServerDataProps = async (): Promise<CookingServerDataProps> => {
  const [
    session,
    cookingUserSettingsRequiredData,
    ingredientMap,
    recipeLevelData,
  ] = await Promise.all([
    getServerSession(authOptions),
    getCookingUserSettingsRequiredData(),
    getIngredientMap(),
    getRecipeLevelData(),
  ]);

  return {
    ...cookingUserSettingsRequiredData,
    ingredientMap,
    recipeLevelData,
    preloaded: createUserSettingsBundle(session),
  };
};
