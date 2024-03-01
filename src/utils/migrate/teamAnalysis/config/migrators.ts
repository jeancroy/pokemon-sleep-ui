import {Migrator} from '@/types/migrate';
import {TeamAnalysisConfig} from '@/types/website/feature/teamAnalysis';
import {TeamAnalysisConfigMigrateParams} from '@/utils/migrate/teamAnalysis/config/type';


export const teamAnalysisConfigMigrators: Migrator<TeamAnalysisConfig, TeamAnalysisConfigMigrateParams>[] = [
  {
    // no-op, simply add a version number
    toVersion: 1,
    migrate: (old) => old,
  },
];
