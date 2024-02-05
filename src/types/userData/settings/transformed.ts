import {EffectiveBonus} from '@/types/game/bonus/main';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {CookingUserSettings} from '@/types/userData/settings/cooking';
import {UserSettings} from '@/types/userData/settings/main';


export type CalculatedUserSettings = Pick<UserSettings, 'behavior'> & {
  origin: UserSettings,
  bonus: EffectiveBonus,
};

export type TranslatedUserSettings = {
  snorlaxFavorite: SnorlaxFavorite,
  calculatedSettings: CalculatedUserSettings,
  cookingSettings: CookingUserSettings,
};
