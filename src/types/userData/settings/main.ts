import {UserBonus} from '@/types/game/bonus/main';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {StaminaCalcConfig} from '@/types/game/stamina/config';
import {Migratable} from '@/types/migrate';
import {UserCalculationBehavior} from '@/types/userData/settings/behavior';
import {CalculatedCookingSettingsRequiredData} from '@/types/userData/settings/cooking/calculated';
import {UserCookingSettings} from '@/types/userData/settings/cooking/settings';
import {UserMultiplierSettings, UserMultiplierSettingsRequiredData} from '@/types/userData/settings/multiplier';


export type UserSettings = Migratable & {
  bonus: UserBonus,
  stamina: StaminaCalcConfig,
  behavior: UserCalculationBehavior,
  snorlaxFavorite: SnorlaxFavorite,
  multiplier: UserMultiplierSettings,
};

export type UserSettingsBundle = {
  settings: UserSettings,
  cooking: UserCookingSettings,
};

export type UserSettingsRequiredData = CalculatedCookingSettingsRequiredData & UserMultiplierSettingsRequiredData;
