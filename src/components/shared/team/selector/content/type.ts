import {TeamSelectorCommonProps} from '@/components/shared/team/selector/type';
import {TeamConfig} from '@/types/game/team';


export type TeamSelectorContentCommonProps<TTeam extends TeamConfig> = TeamSelectorCommonProps<TTeam> & {
  onPicked: (selectedUuid: string) => void,
  onUpdated: (updated: TTeam) => void,
  onDeleted: (deletedUuid: string) => void,
  onAdded: (newTeam: TTeam) => void,
  onCopied: (sourceUuid: string) => void,
};
