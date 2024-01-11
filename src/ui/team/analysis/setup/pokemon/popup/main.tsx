import React from 'react';

import {PopupCommon} from '@/components/popup/common/main';
import {RatingResultPopup} from '@/components/shared/pokemon/rating/popup';
import {TeamAnalysisPokemonPopupContent} from '@/ui/team/analysis/setup/pokemon/popup/content';
import {TeamAnalysisPokemonPopupCommonProps} from '@/ui/team/analysis/setup/pokemon/popup/type';
import {toPokemonList} from '@/utils/game/pokemon/utils';


export const TeamAnalysisPokemonPopup = (props: TeamAnalysisPokemonPopupCommonProps) => {
  const {state, pokedexMap} = props;
  const {control, hide} = state;

  return (
    <>
      <PopupCommon show={control.show} setShow={hide}>
        <TeamAnalysisPokemonPopupContent {...props}/>
      </PopupCommon>
      <RatingResultPopup pokemonList={toPokemonList(pokedexMap)} {...props}/>
    </>
  );
};
