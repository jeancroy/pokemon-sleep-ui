import {defaultUserConfig} from '@/const/user/config/user';
import {testCookingRecoveryData} from '@/tests/data/game/cookingRecovery';
import {testEventStrengthMultiplierData} from '@/tests/data/game/eventStrengthMultiplier';
import {testDefaultSnorlaxFavorite} from '@/tests/data/game/snorlax';
import {CalculatedUserConfig} from '@/types/userData/config/user/main';
import {toCalculatedUserConfig, ToCalculatedUserConfigOpts} from '@/utils/user/config/user/main';


export const testDefaultToCalculatedUserConfigOpts: ToCalculatedUserConfigOpts = {
  userConfig: defaultUserConfig,
  cookingRecoveryData: testCookingRecoveryData,
  snorlaxFavorite: testDefaultSnorlaxFavorite,
  eventStrengthMultiplierData: testEventStrengthMultiplierData,
};

export const testDefaultCalculatedUserConfig: CalculatedUserConfig = (
  toCalculatedUserConfig(testDefaultToCalculatedUserConfigOpts)
);
