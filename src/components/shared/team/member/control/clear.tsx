import React from 'react';

import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import {clsx} from 'clsx';

import {teamMemberControlButtonStyle} from '@/components/shared/team/member/control/const';


type Props = {
  onClearClicked: () => void,
  disabled?: boolean,
};

export const TeamMemberControlClear = ({onClearClicked, disabled}: Props) => {
  return (
    <button onClick={onClearClicked} disabled={disabled} className={clsx(
      teamMemberControlButtonStyle,
      'disabled:button-disabled-border text-danger',
    )}>
      <XMarkIcon/>
    </button>
  );
};
