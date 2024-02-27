import {TeamSelectorCommonProps} from '@/components/shared/team/selector/type';
import {TeamSetupConfig} from '@/types/game/team/config';
import {TeamMemberData, TeamMemberKey} from '@/types/game/team/member';
import {TeamSetup} from '@/types/game/team/setup';
import {TeamData} from '@/types/game/team/team';
import {Nullable} from '@/utils/type';


export type TeamSelectorContentCommonProps<
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
> = TeamSelectorCommonProps<TKey, TMember, TConfig, TTeam, TSetup> & {
  onPicked: (selectedUuid: string) => void,
  onUpdated: (updated: TTeam) => void,
  onDeleted: (deletedUuid: string) => void,
  onAdded: (newTeam: TTeam) => void,
  onCopied: (sourceUuid: string) => void,
};
