import {PokemonIngredientStatsCommonProps} from '@/components/shared/pokemon/icon/itemStats/type';
import {CookingUserSettingsRequiredData} from '@/types/userData/settings/cooking';
import {UserSettingsBundle} from '@/types/userData/settings/main';


export type IngredientProductionDataProps =
  Omit<PokemonIngredientStatsCommonProps, 'translatedSettings'> &
  CookingUserSettingsRequiredData & {
    preloaded: UserSettingsBundle,
  };
