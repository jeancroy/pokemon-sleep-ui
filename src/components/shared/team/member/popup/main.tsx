import React from 'react';

import {PopupCommon} from '@/components/popup/common/main';
import {RatingResultPopup} from '@/components/shared/pokemon/rating/popup';
import {TeamMemberPopupContent} from '@/components/shared/team/member/popup/content';
import {TeamMemberPopupCommonProps} from '@/components/shared/team/member/popup/type';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {toPokemonList} from '@/utils/game/pokemon/utils';


export const TeamMemberPopup = (props: TeamMemberPopupCommonProps) => {
  const {state} = props;
  const {control, hide} = state;

  const {pokedexMap} = useCommonServerData();

  return (
    <>
      <PopupCommon show={control.show} setShow={hide}>
        <TeamMemberPopupContent {...props}/>
      </PopupCommon>
      <RatingResultPopup pokemonList={toPokemonList(pokedexMap)} {...props}/>
    </>
  );
};
