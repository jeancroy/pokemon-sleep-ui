import React from 'react';

import {useSession} from 'next-auth/react';

import {Flex} from '@/components/layout/flex/common';
import {RatingPopupControl} from '@/components/shared/pokemon/rating/type';
import {TeamMemberControlClear} from '@/components/shared/team/member/control/clear';
import {TeamMemberControlMenu} from '@/components/shared/team/member/control/menu';
import {TeamMemberControlPokemonLink} from '@/components/shared/team/member/control/pokemonLink';
import {TeamMemberPopupControl} from '@/components/shared/team/member/popup/type';
import {TeamMemberProps} from '@/components/shared/team/member/type';
import {usePremiumRequiredToast} from '@/hooks/toast/main';
import {useUserActivation} from '@/hooks/userData/activation';


type Props = TeamMemberProps & {
  teamMemberPopup: TeamMemberPopupControl,
  ratingControl: RatingPopupControl,
};

export const TeamMemberControls = ({teamMemberPopup, ratingControl, ...props}: Props) => {
  const {member, setMember} = props;

  const {data: session} = useSession();
  const {isPremium} = useUserActivation(session);
  const {showPremiumRequiredToast} = usePremiumRequiredToast();

  return (
    <Flex direction="row" className="justify-end gap-1">
      <TeamMemberControlPokemonLink {...props}/>
      <TeamMemberControlMenu
        ratingControl={ratingControl}
        onPopupButtonClick={(type, requirePremium) => {
          if (requirePremium && !isPremium) {
            showPremiumRequiredToast();
            return;
          }

          teamMemberPopup.show(type);
        }}
        isPremium={isPremium}
        {...props}
      />
      <TeamMemberControlClear onClearClicked={() => setMember(null)} disabled={!member}/>
    </Flex>
  );
};
