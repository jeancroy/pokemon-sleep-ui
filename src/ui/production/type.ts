import {ConfigBundle} from '@/types/userData/config/bundle';
import {UserProductionComparisonContent} from '@/types/userData/productionComparison';
import {Nullable} from '@/utils/type';


export type ProductionComparisonDataProps = {
  preloaded: {
    bundle: ConfigBundle,
    setup: Nullable<UserProductionComparisonContent>,
  },
};
