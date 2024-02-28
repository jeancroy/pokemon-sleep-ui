import {TeamSetupConfig} from '@/types/game/team/config';
import {TeamMemberData, TeamMemberKey} from '@/types/game/team/member';
import {TeamSetup} from '@/types/game/team/setup';
import {TeamData} from '@/types/game/team/team';
import {Nullable} from '@/utils/type';


type UpdateCurrentTeamMemberOpts<
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
> = {
  original: TSetup,
  key: TKey,
  update: Partial<TeamMemberData> | null,
};

export const updateCurrentTeamMember = <
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
>({
  original,
  key,
  update,
}: UpdateCurrentTeamMemberOpts<TKey, TMember, TConfig, TTeam, TSetup>) => {
  const {teams, config} = original;

  // `merge()` keeps the original value if the `update` is undefined, but `update` should overwrite it
  return {
    ...original,
    teams: {
      ...teams,
      [config.current]: {
        ...teams[config.current],
        members: {
          ...teams[config.current].members,
          [key]: {
            ...teams[config.current].members[key],
            ...update,
          },
        },
      },
    },
  };
};
