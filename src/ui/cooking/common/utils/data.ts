import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {getConfigRequiredData} from '@/controller/dataBundle/config';
import {getIngredientMap} from '@/controller/ingredient';
import {getPotInfoList} from '@/controller/potInfo';
import {getRecipeLevelData} from '@/controller/recipeLevel';
import {CookingServerDataProps} from '@/ui/cooking/common/type';
import {createConfigBundle} from '@/utils/user/config/create';


export const getCookingServerDataProps = async (): Promise<CookingServerDataProps> => {
  const [
    session,
    configRequiredData,
    ingredientMap,
    potInfoList,
    recipeLevelData,
  ] = await Promise.all([
    getServerSession(authOptions),
    getConfigRequiredData(),
    getIngredientMap(),
    getPotInfoList(),
    getRecipeLevelData(),
  ]);

  return {
    ingredientMap,
    potInfoList,
    recipeLevelData,
    preloaded: createConfigBundle(session),
    ...configRequiredData,
  };
};
