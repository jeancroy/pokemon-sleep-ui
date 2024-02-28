import {TeamSetupConfig} from '@/types/game/team/config';
import {TeamMemberData, TeamMemberKey} from '@/types/game/team/member';
import {TeamSetup} from '@/types/game/team/setup';
import {TeamData} from '@/types/game/team/team';
import {Nullable} from '@/utils/type';


type GetUpdatedTeamSetup<
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
> = {
  original: TSetup,
  team: TTeam,
};

export const getUpdatedTeamSetup = <
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
>({
  original,
  team,
}: GetUpdatedTeamSetup<TKey, TMember, TConfig, TTeam, TSetup>): TSetup => {
  return {
    ...original,
    teams: {
      ...original.teams,
      [team.uuid]: team,
    },
  };
};
