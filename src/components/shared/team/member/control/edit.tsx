import React from 'react';

import {teamMemberControlButtonStyle} from '@/components/shared/team/member/control/const';
import {TeamMemberEditIcon} from '@/components/shared/team/member/control/icon/edit';


type Props = {
  onClick: () => void,
};

export const TeamMemberControlEdit = ({onClick}: Props) => {
  return (
    <button className={teamMemberControlButtonStyle} onClick={onClick}>
      <TeamMemberEditIcon/>
    </button>
  );
};
