import {UserBonus} from '@/types/game/bonus/main';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {StaminaCalcConfig} from '@/types/game/stamina/config';
import {Migratable} from '@/types/migrate';
import {UserCookingPreset} from '@/types/userData/cooking';
import {UserCalculationBehavior} from '@/types/userData/settings/behavior';


export type UserSettings = Migratable & {
  bonus: UserBonus,
  stamina: StaminaCalcConfig,
  behavior: UserCalculationBehavior,
  snorlaxFavorite: SnorlaxFavorite,
};

export type UserSettingsBundle = {
  settings: UserSettings,
  cooking: UserCookingPreset,
};
