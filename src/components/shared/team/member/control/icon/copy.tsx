import React from 'react';

import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon';

import {teamMemberControlMenuIconStyle} from '@/components/shared/team/member/control/const';


export const TeamMemberCopyIcon = () => {
  return <DocumentDuplicateIcon className={teamMemberControlMenuIconStyle}/>;
};
