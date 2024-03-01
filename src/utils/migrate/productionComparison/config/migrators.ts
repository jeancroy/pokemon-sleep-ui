import {Migrator} from '@/types/migrate';
import {ProductionComparisonConfig} from '@/types/website/feature/productionComparison';
import {ProductionComparisonConfigMigrateParams} from '@/utils/migrate/productionComparison/config/type';


export const productionComparisonConfigMigrators: Migrator<
  ProductionComparisonConfig,
  ProductionComparisonConfigMigrateParams
>[] = [
  {
    // no-op, simply add a version number
    toVersion: 1,
    migrate: (old) => old,
  },
];
