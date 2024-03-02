import {defaultRatingConfig} from '@/const/game/rating/common';
import {RatingConfig} from '@/types/game/pokemon/rating/config';
import {Migrator} from '@/types/migrate';
import {RatingConfigMigrateParams} from '@/utils/migrate/ratingConfig/type';


export const ratingConfigMigrators: Migrator<RatingConfig, RatingConfigMigrateParams>[] = [
  {
    toVersion: 1,
    // Added `category`
    migrate: ({category, ...old}) => ({
      ...old,
      category: category ?? defaultRatingConfig.category,
    }),
  },
];
