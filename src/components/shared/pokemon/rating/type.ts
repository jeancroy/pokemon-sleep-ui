import React from 'react';

import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {PokemonKeyLevel} from '@/types/game/pokemon/level';
import {MainSkillMap} from '@/types/game/pokemon/mainSkill';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {RatingConfig} from '@/types/game/pokemon/rating/config';
import {RatingRequest, RatingSetupData} from '@/types/game/pokemon/rating/request';
import {RatingResultOfLevel} from '@/types/game/pokemon/rating/result';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {CookingUserSettingsRequiredData} from '@/types/userData/settings';


export type RatingResultProps = CookingUserSettingsRequiredData & {
  pokemon: PokemonInfo,
  pokemonList: PokemonInfo[],
  pokemonProducingParams: PokemonProducingParams,
  request: RatingRequest | undefined,
  berryDataMap: BerryDataMap,
  ingredientChainMap: IngredientChainMap,
  ingredientMap: IngredientMap,
  mainSkillMap: MainSkillMap,
  subSkillMap: SubSkillMap,
  recipeLevelData: RecipeLevelData[],
  pokemonMaxLevel: number,
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
