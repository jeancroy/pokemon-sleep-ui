import React from 'react';

import {teamMemberControlButtonStyle} from '@/components/shared/team/member/control/const';
import {TeamMemberDetailedStatsIcon} from '@/components/shared/team/member/control/icon/detailedStats';


type Props = {
  onClick: () => void,
};

export const TeamMemberControlDetailedStats = ({onClick}: Props) => {
  return (
    <button className={teamMemberControlButtonStyle} onClick={onClick}>
      <TeamMemberDetailedStatsIcon/>
    </button>
  );
};
