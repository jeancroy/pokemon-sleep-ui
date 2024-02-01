import {TeamMemberPopupType} from '@/components/shared/team/member/popup/type';


export const teamMemberPopupPremiumRequired: {[type in TeamMemberPopupType]: boolean} = {
  memberConfig: false,
  detailedStats: true,
  growthChart: true,
  mealCoverage: true,
  sharableLink: false,
};
