import {SnorlaxFavorite} from '@/types/game/snorlax';
import {StaminaCalcConfig} from '@/types/game/stamina/config';
import {CalculatedCookingConfig, CookingConfig} from '@/types/userData/config/cooking/main';
import {CalculatedUserConfig, UserConfig} from '@/types/userData/config/user/main';


export type ConfigBundle = {
  userConfig: UserConfig,
  cookingConfig: CookingConfig,
};

export type CalculatedConfigBundle = {
  bundle: ConfigBundle,
  snorlaxFavorite: SnorlaxFavorite,
  calculatedUserConfig: CalculatedUserConfig,
  calculatedCookingConfig: CalculatedCookingConfig,
};

export type ConfigOverride = {
  cooking: CookingConfig,
  stamina: StaminaCalcConfig,
  snorlaxFavorite: SnorlaxFavorite,
};
