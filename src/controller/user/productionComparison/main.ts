import {userProductionComparisonConfig} from '@/controller/user/manager';
import {getProductionComparisonPresetsOfUser} from '@/controller/user/productionComparison/preset';
import {UserProductionComparisonContent} from '@/types/userData/productionComparison';
import {Nullable} from '@/utils/type';


export const getUserProductionComparisonContent = async (
  userId?: string,
): Promise<Nullable<UserProductionComparisonContent>> => {
  if (!userId) {
    return null;
  }

  const [
    config,
    presets,
  ] = await Promise.all([
    userProductionComparisonConfig.getData(userId),
    getProductionComparisonPresetsOfUser(userId),
  ]);

  if (!config) {
    return null;
  }

  return {config: config.data, presets};
};
