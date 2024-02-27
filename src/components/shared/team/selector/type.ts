import {TeamSetupControl} from '@/components/shared/team/setupControl/type';
import {TeamSetupConfig} from '@/types/game/team/config';
import {TeamMemberData, TeamMemberKey} from '@/types/game/team/member';
import {TeamSetup} from '@/types/game/team/setup';
import {TeamData} from '@/types/game/team/team';
import {Nullable} from '@/utils/type';


export type TeamSelectorCommonProps<
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
> = {
  setupControl: TeamSetupControl<TKey, TMember, TConfig, TTeam, TSetup>,
  generateNewTeam: (uuid: string) => TTeam,
  memberList: TMember[],
};
