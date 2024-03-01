import {v4} from 'uuid';

import {ConfigBundle} from '@/types/userData/config/bundle';
import {UserTeamAnalysisContent} from '@/types/userData/teamAnalysis';
import {TeamAnalysisComp, TeamAnalysisConfig, TeamAnalysisSetup} from '@/types/website/feature/teamAnalysis';
import {generateTeamAnalysisComp} from '@/ui/team/analysis/utils';
import {migrate} from '@/utils/migrate/main';
import {teamAnalysisCompMigrators} from '@/utils/migrate/teamAnalysis/comp/migrators';
import {teamAnalysisConfigMigrators} from '@/utils/migrate/teamAnalysis/config/migrators';
import {Nullable} from '@/utils/type';


type GetInitialTeamAnalysisSetupOpts = {
  data: Nullable<UserTeamAnalysisContent>,
  bundle: ConfigBundle,
};

export const getInitialTeamAnalysisSetup = ({
  data,
  bundle,
}: GetInitialTeamAnalysisSetupOpts): TeamAnalysisSetup => {
  // Migrate first for older data version
  // If the user is not logged in or new, they won't have `preloadedSetup` so they need an initial comp
  // Therefore generate the initial comp for migration, then ignore it if it's not needed
  const initialCompUuid = v4();
  const config: TeamAnalysisConfig = migrate({
    original: {
      current: initialCompUuid,
      version: teamAnalysisConfigMigrators.length,
    },
    override: data?.config ?? null,
    migrators: teamAnalysisConfigMigrators,
    migrateParams: {},
  });

  const compsToMigrate = data?.comps ?? [generateTeamAnalysisComp({
    uuid: initialCompUuid,
    bundle,
  })];
  const teams: TeamAnalysisComp[] = compsToMigrate.map((team) => migrate({
    original: generateTeamAnalysisComp({
      uuid: team.uuid,
      bundle,
    }),
    override: team,
    migrators: teamAnalysisCompMigrators,
    migrateParams: {},
  }));
  return {
    config,
    teams: Object.fromEntries(teams.map((team) => [team.uuid, team])),
  };
};
