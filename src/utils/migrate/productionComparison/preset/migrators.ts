import {defaultSnorlaxFavorite} from '@/const/game/snorlax';
import {defaultCookingConfig} from '@/const/user/config/cooking';
import {defaultStaminaCalcConfig} from '@/const/user/config/user';
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
  {
    // Updated `SnorlaxFavorite` typing placement
    toVersion: 2,
    // @ts-ignore
    migrate: ({snorlaxFavorite, ...old}) => ({
      ...old,
      configOverride: {
        snorlaxFavorite: snorlaxFavorite ?? defaultSnorlaxFavorite,
        cooking: defaultCookingConfig,
        stamina: defaultStaminaCalcConfig,
      },
    }),
  },
  {
    // Added `configSource`
    toVersion: 3,
    migrate: (old) => ({
      ...old,
      configSource: 'default',
    }),
  },
  {
    // Updated `pinnedStats` typing and add `sort`
    toVersion: 4,
    migrate: (old) => ({
      ...old,
      sort: null,
      pinnedStats: {total: true},
    }),
  },
];
