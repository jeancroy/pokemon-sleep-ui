import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {getUserSettingsRequiredData} from '@/controller/dataBundle/settings';
import {getIngredientMap} from '@/controller/ingredient';
import {getRecipeLevelData} from '@/controller/recipeLevel';
import {CookingServerDataProps} from '@/ui/cooking/common/type';
import {createUserSettingsBundle} from '@/utils/user/settings/create';


export const getCookingServerDataProps = async (): Promise<CookingServerDataProps> => {
  const [
    session,
    userSettingsRequiredData,
    ingredientMap,
    recipeLevelData,
  ] = await Promise.all([
    getServerSession(authOptions),
    getUserSettingsRequiredData(),
    getIngredientMap(),
    getRecipeLevelData(),
  ]);

  return {
    ingredientMap,
    recipeLevelData,
    preloaded: createUserSettingsBundle(session),
    ...userSettingsRequiredData,
  };
};
