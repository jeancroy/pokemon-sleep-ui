import {v4} from 'uuid';

import {TeamAnalysisComp} from '@/types/teamAnalysis';
import {getDefaultTeamName} from '@/ui/team/analysis/utils';
import {teamAnalysisCompMigrators} from '@/utils/migrate/teamAnalysis/comp/migrators';
import {toTeamMemberNullable} from '@/utils/team/toMember';
import {ToTeamAnalysisCompFromPokeboxCommonOpts, ToTeamAnalysisMemberNullableData} from '@/utils/team/type';


export type ToTeamAnalysisCompFromPokeboxOpts =
  ToTeamAnalysisCompFromPokeboxCommonOpts &
  ToTeamAnalysisMemberNullableData;

export const toTeamAnalysisCompFromPokebox = ({
  members,
  snorlaxFavorite,
  name,
  ...opts
}: ToTeamAnalysisCompFromPokeboxOpts): TeamAnalysisComp => {
  const uuid = v4();

  return {
    version: teamAnalysisCompMigrators.length,
    uuid,
    name: name || getDefaultTeamName(uuid),
    snorlaxFavorite,
    analysisPeriod: 'daily',
    members: {
      A: toTeamMemberNullable({pokeInBox: members.at(0), ...opts}) ?? null,
      B: toTeamMemberNullable({pokeInBox: members.at(1), ...opts}) ?? null,
      C: toTeamMemberNullable({pokeInBox: members.at(2), ...opts}) ?? null,
      D: toTeamMemberNullable({pokeInBox: members.at(3), ...opts}) ?? null,
      E: toTeamMemberNullable({pokeInBox: members.at(4), ...opts}) ?? null,
    },
  };
};
