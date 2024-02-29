import React from 'react';

import {teamMemberControlButtonStyle} from '@/components/shared/team/member/control/const';
import {TeamMemberCopyIcon} from '@/components/shared/team/member/control/icon/copy';


type Props = {
  onClick: () => void,
};

export const TeamMemberControlCopy = ({onClick}: Props) => {
  return (
    <button className={teamMemberControlButtonStyle} onClick={onClick}>
      <TeamMemberCopyIcon/>
    </button>
  );
};
