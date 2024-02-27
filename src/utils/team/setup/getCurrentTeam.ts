import {TeamSetupConfig} from '@/types/game/team/config';
import {TeamMemberData, TeamMemberKey} from '@/types/game/team/member';
import {TeamSetup} from '@/types/game/team/setup';
import {TeamData} from '@/types/game/team/team';
import {Nullable} from '@/utils/type';


type GetCurrentTeamOverrideOpts<
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
> = {
  key: TKey,
  member: TMember,
};

type GetCurrentTeamOpts<
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
> = {
  setup: TSetup,
  override?: GetCurrentTeamOverrideOpts<TKey, TMember> | null,
};

export const getCurrentTeam = <
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
>({setup, override}: GetCurrentTeamOpts<TKey, TMember, TConfig, TTeam, TSetup>): TTeam => {
  const {config, teams} = setup;

  const currentTeam = teams[config.current];

  if (!override) {
    return currentTeam;
  }

  return {
    ...currentTeam,
    members: {
      ...currentTeam.members,
      [override.key]: override.member,
    },
  };
};
