import {UserBonus} from '@/types/game/bonus/main';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {StaminaCalcConfig} from '@/types/game/stamina/config';
import {Migratable} from '@/types/migrate';
import {UserCookingPreset} from '@/types/userData/cooking';
import {UserCalculationBehavior} from '@/types/userData/settings/behavior';
import {UserMultiplierSettings} from '@/types/userData/settings/multiplier';


export type UserSettings = Migratable & {
  bonus: UserBonus,
  stamina: StaminaCalcConfig,
  behavior: UserCalculationBehavior,
  snorlaxFavorite: SnorlaxFavorite,
  multiplier: UserMultiplierSettings,
};

export type UserSettingsBundle = {
  settings: UserSettings,
  cooking: UserCookingPreset,
};
