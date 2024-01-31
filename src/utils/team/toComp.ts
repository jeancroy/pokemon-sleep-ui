import {v4} from 'uuid';

import {testDefaultSnorlaxFavorite} from '@/tests/data/game/snorlax';
import {TeamAnalysisComp} from '@/types/teamAnalysis';
import {getDefaultTeamName} from '@/ui/team/analysis/utils';
import {teamAnalysisCompMigrators} from '@/utils/migrate/teamAnalysis/comp/migrators';
import {toTeamAnalysisMemberNullable} from '@/utils/team/toMember';
import {ToTeamAnalysisCompFromPokeboxCommonOpts, ToTeamAnalysisMemberNullableData} from '@/utils/team/type';


export type ToTeamAnalysisCompFromPokeboxOpts =
  ToTeamAnalysisCompFromPokeboxCommonOpts &
  ToTeamAnalysisMemberNullableData;

export const toTeamAnalysisCompFromPokebox = ({
  members,
  name,
  ...opts
}: ToTeamAnalysisCompFromPokeboxOpts): TeamAnalysisComp => {
  const uuid = v4();

  return {
    version: teamAnalysisCompMigrators.length,
    uuid,
    name: name || getDefaultTeamName(uuid),
    snorlaxFavorite: testDefaultSnorlaxFavorite,
    analysisPeriod: 'daily',
    members: {
      A: toTeamAnalysisMemberNullable({pokeInBox: members.at(0), ...opts}) ?? null,
      B: toTeamAnalysisMemberNullable({pokeInBox: members.at(1), ...opts}) ?? null,
      C: toTeamAnalysisMemberNullable({pokeInBox: members.at(2), ...opts}) ?? null,
      D: toTeamAnalysisMemberNullable({pokeInBox: members.at(3), ...opts}) ?? null,
      E: toTeamAnalysisMemberNullable({pokeInBox: members.at(4), ...opts}) ?? null,
    },
  };
};
