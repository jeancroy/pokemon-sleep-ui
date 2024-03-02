import React from 'react';

import {CollapsibleFull} from '@/components/layout/collapsible/full';
import {Flex} from '@/components/layout/flex/common';
import {useRatingPopup} from '@/components/shared/pokemon/rating/hooks/popup';
import {TeamMemberCollapsibleButton} from '@/components/shared/team/member/button';
import {TeamMemberDetails} from '@/components/shared/team/member/content/details';
import {TeamMemberControls} from '@/components/shared/team/member/control/main';
import {useTeamMemberPopup} from '@/components/shared/team/member/popup/hook';
import {TeamMemberPopup} from '@/components/shared/team/member/popup/main';
import {TeamMemberProps} from '@/components/shared/team/member/type';


export const TeamMember = (props: TeamMemberProps) => {
  const {collapsible} = props;

  const teamMemberPopup = useTeamMemberPopup();
  const ratingControl = useRatingPopup();

  return (
    <Flex className="items-center gap-0.5">
      <TeamMemberPopup
        state={teamMemberPopup}
        ratingControl={ratingControl}
        {...props}
      />
      <TeamMemberControls
        teamMemberPopup={teamMemberPopup}
        ratingControl={ratingControl}
        {...props}
      />
      <CollapsibleFull
        control={collapsible}
        button={<TeamMemberCollapsibleButton isExpanded={collapsible.show} {...props}/>}
      >
        <TeamMemberDetails {...props}/>
      </CollapsibleFull>
    </Flex>
  );
};
