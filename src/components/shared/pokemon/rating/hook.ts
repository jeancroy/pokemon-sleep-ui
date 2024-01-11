import React from 'react';

import {RatingPopupControl, RatingPopupControlState, RatingResultMap} from '@/components/shared/pokemon/rating/type';
import {generateInitialRatingResult} from '@/components/shared/pokemon/rating/utils';
import {PokemonKeyLevel, pokemonKeyLevels} from '@/types/game/pokemon/level';
import {RatingRequest} from '@/types/game/pokemon/rating/request';
import {RatingResultOfLevel} from '@/types/game/pokemon/rating/result';
import {ValueOf} from '@/utils/type';


export const useRatingPopup = (): RatingPopupControl => {
  const [state, setState] = React.useState<RatingPopupControlState>({
    show: false,
    request: undefined,
  });

  return {
    state,
    setState,
    sendRequest: (setup) => setState({
      show: true,
      request: {
        timestamp: Date.now(),
        setup,
      },
    }),
  };
};

type UseRatingResultOpts = {
  pokemonMaxLevel: number,
  request: RatingRequest | undefined,
};

export const useRatingResult = ({
  pokemonMaxLevel,
  request,
}: UseRatingResultOpts) => {
  const activeKeyLevels: PokemonKeyLevel[] = React.useMemo(() => (
    pokemonKeyLevels
      .filter((level) => level <= pokemonMaxLevel)
      .sort((a, b) => a - b)
  ), [pokemonMaxLevel]);

  const generateEmptyRatingResultMap = React.useCallback((): RatingResultMap => {
    return Object.fromEntries(activeKeyLevels.map((level) => [
      level,
      generateInitialRatingResult(level) satisfies ValueOf<RatingResultMap>,
    ])) as RatingResultMap;
  }, [activeKeyLevels]);

  const [
    resultMap,
    setResultMap,
  ] = React.useState<RatingResultMap>(generateEmptyRatingResultMap);

  React.useEffect(() => {
    setResultMap(generateEmptyRatingResultMap());
  }, [request]);

  const updateResultOfLevel = React.useCallback((result: RatingResultOfLevel) => {
    const {level} = result;

    setResultMap((original) => ({
      ...original,
      [level]: result,
    } satisfies RatingResultMap));
  }, []);

  return {
    activeKeyLevels,
    resultMap,
    updateResultOfLevel,
  };
};
