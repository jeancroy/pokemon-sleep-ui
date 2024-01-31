import React from 'react';

import {TeamMemberPopupState} from '@/components/shared/team/member/popup/type';
import {TeamMemberPopupType} from '@/components/shared/team/member/type';


export const useTeamMemberPopup = () => {
  const [control, setControl] = React.useState<TeamMemberPopupState>({
    type: null,
    show: false,
  });

  return {
    control,
    show: (type: TeamMemberPopupType) => setControl({
      type,
      show: true,
    }),
    hide: () => setControl((original) => ({
      ...original,
      show: false,
    })),
  };
};
