import {Migrator} from '@/types/migrate';
import {ProductionComparisonPreset} from '@/types/productionComparison';
import {ProductionComparisonPresetMigrateParams} from '@/utils/migrate/productionComparison/preset/type';


export const productionComparisonPresetMigrators: Migrator<
  ProductionComparisonPreset,
  ProductionComparisonPresetMigrateParams
>[] = [
  {
    // no-op, simply add a version number
    toVersion: 1,
    migrate: (old) => old,
  },
];
