import {defaultUserSettings} from '@/const/user/settings';
import {testCookingRecoveryData} from '@/tests/data/game/cookingRecovery';
import {testEventStrengthMultiplierData} from '@/tests/data/game/eventStrengthMultiplier';
import {testDefaultSnorlaxFavorite} from '@/tests/data/game/snorlax';
import {CalculatedUserSettings} from '@/types/userData/settings/transformed';
import {toCalculatedUserSettings, ToCalculatedUserSettingsOpts} from '@/utils/user/settings/calculated';


export const testDefaultToCalculatedUserSettingsOpts: ToCalculatedUserSettingsOpts = {
  settings: defaultUserSettings,
  cookingRecoveryData: testCookingRecoveryData,
  snorlaxFavorite: testDefaultSnorlaxFavorite,
  eventStrengthMultiplierData: testEventStrengthMultiplierData,
};

export const testDefaultCalculatedUserSettings: CalculatedUserSettings = (
  toCalculatedUserSettings(testDefaultToCalculatedUserSettingsOpts)
);
