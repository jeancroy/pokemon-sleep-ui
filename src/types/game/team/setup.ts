import {TeamSetupConfig} from '@/types/game/team/config';
import {TeamMemberData, TeamMemberKey} from '@/types/game/team/member';
import {TeamData} from '@/types/game/team/team';
import {Nullable} from '@/utils/type';


export type TeamSetup<
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember> = TeamData<TKey, TMember>,
> = {
  config: TConfig,
  teams: {[uuid in string]: TTeam},
};
