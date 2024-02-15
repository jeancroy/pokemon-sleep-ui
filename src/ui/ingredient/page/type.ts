import {PokemonIngredientStatsCommonProps} from '@/components/shared/pokemon/icon/itemStats/type';
import {UserSettingsBundle, UserSettingsRequiredData} from '@/types/userData/settings/main';


export type IngredientProductionDataProps =
  Omit<PokemonIngredientStatsCommonProps, 'bundle' | 'translatedSettings'> &
  UserSettingsRequiredData & {
    preloaded: UserSettingsBundle,
  };
