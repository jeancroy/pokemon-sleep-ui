import {v4} from 'uuid';

import {TeamAnalysisComp, TeamAnalysisConfig, TeamAnalysisSetup} from '@/types/teamAnalysis';
import {UserTeamAnalysisContent} from '@/types/userData/teamAnalysis';
import {generateEmptyTeam} from '@/ui/team/analysis/utils';
import {migrate} from '@/utils/migrate/main';
import {teamAnalysisCompMigrators} from '@/utils/migrate/teamAnalysis/comp/migrators';
import {teamAnalysisConfigMigrators} from '@/utils/migrate/teamAnalysis/config/migrators';
import {Nullable} from '@/utils/type';


type GetInitialTeamAnalysisSetupOpts = {
  data: Nullable<UserTeamAnalysisContent>,
};

export const getInitialTeamAnalysisSetup = ({data}: GetInitialTeamAnalysisSetupOpts): TeamAnalysisSetup => {
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

  const compsToMigrate = data?.comps ?? [generateEmptyTeam(initialCompUuid)];
  const comps: TeamAnalysisComp[] = compsToMigrate.map((team) => migrate({
    original: generateEmptyTeam(team.uuid),
    override: team,
    migrators: teamAnalysisCompMigrators,
    migrateParams: {},
  }));
  return {
    config,
    comps: Object.fromEntries(comps.map((team) => [team.uuid, team])),
  };
};
