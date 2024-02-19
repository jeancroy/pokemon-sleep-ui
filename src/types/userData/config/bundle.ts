import {SnorlaxFavorite} from '@/types/game/snorlax';
import {CalculatedCookingConfig, CookingConfig} from '@/types/userData/config/cooking/main';
import {CalculatedUserConfig, UserConfig} from '@/types/userData/config/user/main';


export type ConfigBundle = {
  userConfig: UserConfig,
  cookingConfig: CookingConfig,
};

export type CalculatedConfigBundle = {
  snorlaxFavorite: SnorlaxFavorite,
  calculatedSettings: CalculatedUserConfig,
  calculatedCookingSettings: CalculatedCookingConfig,
};
