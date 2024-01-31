import React from 'react';

import {PopupCommon} from '@/components/popup/common/main';
import {RatingResultPopup} from '@/components/shared/pokemon/rating/popup';
import {TeamMemberPopupContent} from '@/components/shared/team/member/popup/content';
import {TeamMemberPopupCommonProps} from '@/components/shared/team/member/popup/type';
import {toPokemonList} from '@/utils/game/pokemon/utils';


export const TeamMemberPopup = (props: TeamMemberPopupCommonProps) => {
  const {state, pokedexMap} = props;
  const {control, hide} = state;

  return (
    <>
      <PopupCommon show={control.show} setShow={hide}>
        <TeamMemberPopupContent {...props}/>
      </PopupCommon>
      <RatingResultPopup pokemonList={toPokemonList(pokedexMap)} {...props}/>
    </>
  );
};
