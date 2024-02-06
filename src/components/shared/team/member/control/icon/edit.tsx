import React from 'react';

import PencilIcon from '@heroicons/react/24/outline/PencilIcon';

import {teamMemberControlMenuIconStyle} from '@/components/shared/team/member/control/const';


export const TeamMemberEditIcon = () => {
  return <PencilIcon className={teamMemberControlMenuIconStyle}/>;
};
