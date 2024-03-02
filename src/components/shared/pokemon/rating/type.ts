import React from 'react';

import {PokemonInfo} from '@/types/game/pokemon';
import {PokemonKeyLevel} from '@/types/game/pokemon/level';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {RatingConfig} from '@/types/game/pokemon/rating/config';
import {RatingRequest, RatingSetupData} from '@/types/game/pokemon/rating/request';
import {RatingResultOfLevel} from '@/types/game/pokemon/rating/result';


export type RatingResultProps = {
  pokemon: PokemonInfo,
  pokemonList: PokemonInfo[],
  pokemonProducingParams: PokemonProducingParams,
  request: RatingRequest | undefined,
  setRequest?: (updated: RatingRequest) => void,
};

export type RatingSummaryCommonProps = {
  activeKeyLevels: PokemonKeyLevel[],
  resultMap: RatingResultMap,
  config: RatingConfig,
};

export type RatingPopupControlState = {
  show: boolean,
  request: RatingRequest | undefined,
};

export type RatingPopupControl = {
  state: RatingPopupControlState,
  setState: React.Dispatch<React.SetStateAction<RatingPopupControlState>>,
  sendRequest: (setup: RatingSetupData) => void,
};

export type RatingResultMap = {[keyLevel in PokemonKeyLevel]?: RatingResultOfLevel};
