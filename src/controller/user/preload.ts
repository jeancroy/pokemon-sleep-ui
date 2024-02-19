import {migrateUserCookingConfig} from '@/controller/migrate/userCooking';
import {
  userDataCookingConfig,
  userDataPokeboxDisplay,
  userDataPokedex,
  userDataUserConfig,
} from '@/controller/user/manager';
import {UserPreloadedData} from '@/types/userData/main';


const getCookingConfig = async (userId: string) => {
  const data = await userDataCookingConfig.getData(userId);

  if (data) {
    return data;
  }

  await migrateUserCookingConfig(userId);

  return await userDataCookingConfig.getData(userId);
};

export const getUserPreloadedData = async (userId: string): Promise<UserPreloadedData> => {
  const [
    cookingConfig,
    pokedex,
    pokeboxDisplay,
    userConfig,
  ] = await Promise.all([
    getCookingConfig(userId),
    userDataPokedex.getData(userId),
    userDataPokeboxDisplay.getData(userId),
    userDataUserConfig.getData(userId),
  ]);

  return {
    cookingConfig: cookingConfig?.data,
    pokedex: pokedex?.data,
    pokeboxDisplay: pokeboxDisplay?.data,
    userConfig: userConfig?.data,
  };
};
