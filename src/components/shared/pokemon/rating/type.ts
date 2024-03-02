import React from 'react';

import {PokemonInfo} from '@/types/game/pokemon';
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
  resultMap: RatingResultMap,
  config: RatingConfig,
  activeNumericKeyLevels: number[],
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

// Storing numeric level instead of `PokemonKeyLevel` to make sure that the results are not double counted,
// if the current max level is one of the key levels
export type RatingResultMap = {[keyLevel in number]?: RatingResultOfLevel};
