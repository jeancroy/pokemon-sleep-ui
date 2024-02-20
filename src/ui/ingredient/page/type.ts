import {PokemonIngredientStatsCommonProps} from '@/components/shared/pokemon/icon/itemStats/type';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {ConfigRequiredData} from '@/types/userData/config/data';


export type IngredientProductionDataProps =
  Omit<PokemonIngredientStatsCommonProps, 'calculatedConfigBundle'> &
  ConfigRequiredData & {
    preloaded: ConfigBundle,
  };
