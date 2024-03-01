import {defaultSnorlaxFavorite} from '@/const/game/snorlax';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {TeamAnalysisComp} from '@/types/website/feature/teamAnalysis';
import {getDefaultTeamName} from '@/utils/game/team/name';
import {teamAnalysisCompMigrators} from '@/utils/migrate/teamAnalysis/comp/migrators';


type GenerateTeamAnalysisCompOpts = {
  uuid: string,
  bundle: ConfigBundle,
};

export const generateTeamAnalysisComp = ({
  uuid,
  bundle,
}: GenerateTeamAnalysisCompOpts): TeamAnalysisComp => {
  return {
    version: teamAnalysisCompMigrators.length,
    uuid,
    name: getDefaultTeamName(uuid),
    analysisPeriod: 'daily',
    members: {
      A: null,
      B: null,
      C: null,
      D: null,
      E: null,
    },
    configOverride: {
      snorlaxFavorite: defaultSnorlaxFavorite,
      cooking: bundle.cookingConfig,
      stamina: bundle.userConfig.stamina,
    },
    configSource: 'default',
    pinnedStats: {total: true},
  };
};
