import {Migrator} from '@/types/migrate';
import {UserSettings} from '@/types/userData/settings';
import {UserSettingsMigrateParams} from '@/utils/migrate/userSettings/type';


export const userSettingsMigrators: Migrator<UserSettings, UserSettingsMigrateParams>[] = [
  {
    toVersion: 1,
    // no-op, simply add a version number
    migrate: (old) => old,
  },
];