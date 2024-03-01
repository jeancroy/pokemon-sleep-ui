import {v4} from 'uuid';

import {TeamAnalysisComp} from '@/types/website/feature/teamAnalysis';
import {getDefaultTeamName} from '@/utils/game/team/name';
import {teamAnalysisCompMigrators} from '@/utils/migrate/teamAnalysis/comp/migrators';
import {toTeamMemberFromPokeInBoxNullable} from '@/utils/team/toMember';
import {ToTeamCompFromPokeboxCommonOpts, ToTeamMemberNullableData} from '@/utils/team/type';


export type ToTeamAnalysisCompFromPokeboxOpts =
  ToTeamCompFromPokeboxCommonOpts &
  ToTeamMemberNullableData;

export const toTeamAnalysisCompFromPokebox = ({
  name,
  members,
  configOverride,
  ...opts
}: ToTeamAnalysisCompFromPokeboxOpts): TeamAnalysisComp => {
  const uuid = v4();

  return {
    version: teamAnalysisCompMigrators.length,
    uuid,
    name: name || getDefaultTeamName(uuid),
    analysisPeriod: 'daily',
    members: {
      A: toTeamMemberFromPokeInBoxNullable({pokeInBox: members.at(0), ...opts}) ?? null,
      B: toTeamMemberFromPokeInBoxNullable({pokeInBox: members.at(1), ...opts}) ?? null,
      C: toTeamMemberFromPokeInBoxNullable({pokeInBox: members.at(2), ...opts}) ?? null,
      D: toTeamMemberFromPokeInBoxNullable({pokeInBox: members.at(3), ...opts}) ?? null,
      E: toTeamMemberFromPokeInBoxNullable({pokeInBox: members.at(4), ...opts}) ?? null,
    },
    configOverride,
    configSource: 'default',
    pinnedStats: {total: true},
  };
};
