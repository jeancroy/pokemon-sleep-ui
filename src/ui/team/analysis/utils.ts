import {defaultSnorlaxFavorite} from '@/const/game/snorlax';
import {TeamAnalysisComp} from '@/types/teamAnalysis';
import {getDefaultTeamName} from '@/utils/game/team/name';
import {teamAnalysisCompMigrators} from '@/utils/migrate/teamAnalysis/comp/migrators';


export const generateEmptyTeam = (uuid: string): TeamAnalysisComp => {
  return {
    version: teamAnalysisCompMigrators.length,
    uuid,
    name: getDefaultTeamName(uuid),
    snorlaxFavorite: defaultSnorlaxFavorite,
    analysisPeriod: 'daily',
    members: {
      A: null,
      B: null,
      C: null,
      D: null,
      E: null,
    },
  };
};
