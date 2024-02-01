import React from 'react';

import {teamMemberControlButtonStyle} from '@/components/shared/team/member/control/const';
import {TeamMemberRatingIcon} from '@/components/shared/team/member/control/icon/rating';
import {
  teamMemberSendRatingRequest,
  TeamMemberSendRatingRequestOpts,
} from '@/components/shared/team/member/control/utils';


export const TeamMemberControlRating = (props: TeamMemberSendRatingRequestOpts) => {
  return (
    <button className={teamMemberControlButtonStyle} onClick={() => teamMemberSendRatingRequest(props)}>
      <TeamMemberRatingIcon/>
    </button>
  );
};
