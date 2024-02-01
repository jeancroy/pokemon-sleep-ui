import React from 'react';

import {teamMemberPopupPremiumRequired} from '@/components/shared/team/member/popup/const';
import {TeamMemberPopupState, TeamMemberPopupType} from '@/components/shared/team/member/popup/type';
import {usePremiumRequiredToast} from '@/hooks/toast/main';


export const useTeamMemberPopup = () => {
  const {showPremiumRequiredToast} = usePremiumRequiredToast();
  const [control, setControl] = React.useState<TeamMemberPopupState>({
    type: null,
    show: false,
  });

  return {
    control,
    show: (type: TeamMemberPopupType, isPremium: boolean) => {
      if (teamMemberPopupPremiumRequired[type] && !isPremium) {
        showPremiumRequiredToast();
        return;
      }

      setControl({
        type,
        show: true,
      });
    },
    hide: () => setControl((original) => ({
      ...original,
      show: false,
    })),
  };
};
