import React from 'react';

import {PopupCommon} from '@/components/popup/common/main';
import {RatingResultPopup} from '@/components/shared/pokemon/rating/popup';
import {TeamAnalysisPokemonPopupContent} from '@/ui/team/analysis/setup/pokemon/popup/content';
import {TeamAnalysisPokemonPopupCommonProps} from '@/ui/team/analysis/setup/pokemon/popup/type';
import {isNotNullish} from '@/utils/type';


export const TeamAnalysisPokemonPopup = (props: TeamAnalysisPokemonPopupCommonProps) => {
  const {state, pokedexMap} = props;
  const {control, hide} = state;

  return (
    <>
      <PopupCommon show={control.show} setShow={hide}>
        <TeamAnalysisPokemonPopupContent {...props}/>
      </PopupCommon>
      <RatingResultPopup pokemonList={Object.values(pokedexMap).filter(isNotNullish)} {...props}/>
    </>
  );
};
