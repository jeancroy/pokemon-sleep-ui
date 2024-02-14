import {RatingPopupControl} from '@/components/shared/pokemon/rating/type';
import {useTeamMemberPopup} from '@/components/shared/team/member/popup/hook';
import {TeamMemberProps} from '@/components/shared/team/member/type';
import {produceTypes} from '@/types/game/producing/common';


export type TeamMemberPopupType =
  'memberConfig' |
  'detailedStats' |
  'growthChart' |
  'mealCoverage' |
  'sharableLink' |
  'pokeboxLink';

export type TeamMemberPopupState = {
  show: boolean,
  type: TeamMemberPopupType | null,
};

export type TeamMemberPopupControl = ReturnType<typeof useTeamMemberPopup>;

export type TeamMemberPopupCommonProps = TeamMemberProps & {
  state: TeamMemberPopupControl,
  ratingControl: RatingPopupControl,
};

export const teamMemberStrengthGrowthDataTypes = [
  ...produceTypes,
  'total',
] as const;

export type TeamMemberStrengthGrowthDataType = typeof teamMemberStrengthGrowthDataTypes[number];
