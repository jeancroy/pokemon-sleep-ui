import React from 'react';

import {CollapsibleFull} from '@/components/layout/collapsible/full';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex/common';
import {useRatingPopup} from '@/components/shared/pokemon/rating/hook';
import {TeamMemberCollapsibleButton} from '@/components/shared/team/member/button';
import {TeamMemberControls} from '@/components/shared/team/member/control/main';
import {TeamMemberDetails} from '@/components/shared/team/member/details';
import {useTeamMemberPopup} from '@/components/shared/team/member/popup/hook';
import {TeamMemberPopup} from '@/components/shared/team/member/popup/main';
import {TeamMemberProps} from '@/components/shared/team/member/type';


export const TeamMember = (props: TeamMemberProps) => {
  const collapsible = useCollapsible();

  const teamMemberPopup = useTeamMemberPopup();
  const ratingControl = useRatingPopup();

  return (
    <Flex className="items-center gap-1">
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
        state={collapsible}
        button={<TeamMemberCollapsibleButton isExpanded={collapsible.show} {...props}/>}
      >
        <TeamMemberDetails {...props}/>
      </CollapsibleFull>
    </Flex>
  );
};
