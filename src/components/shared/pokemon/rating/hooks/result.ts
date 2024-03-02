import React from 'react';

import {RatingResultMap} from '@/components/shared/pokemon/rating/type';
import {generateInitialRatingResult} from '@/components/shared/pokemon/rating/utils';
import {usePokemonKeyLevelConverter} from '@/hooks/pokemon/keyLevel/convert';
import {useNumericPokemonKeyLevels} from '@/hooks/pokemon/keyLevel/numeric';
import {RatingRequest} from '@/types/game/pokemon/rating/request';
import {RatingResultOfLevel} from '@/types/game/pokemon/rating/result';
import {ValueOf} from '@/utils/type';


type UseRatingResultOpts = {
  request: RatingRequest | undefined,
};

export const useRatingResult = ({
  request,
}: UseRatingResultOpts) => {
  const numericKeyLevels = useNumericPokemonKeyLevels();
  const convertPokemonKevLevel = usePokemonKeyLevelConverter();

  const maxRatingLevel = convertPokemonKevLevel(request?.setup.maxRatingLevel ?? Infinity);
  const activeNumericKeyLevels = numericKeyLevels
    .filter((level) => level <= maxRatingLevel);

  const generateEmptyRatingResultMap = React.useCallback((): RatingResultMap => {
    return Object.fromEntries(activeNumericKeyLevels.map((level) => [
      level satisfies number,
      generateInitialRatingResult(level) satisfies ValueOf<RatingResultMap>,
    ]),
    ) as RatingResultMap;
  }, [activeNumericKeyLevels]);

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
    activeNumericKeyLevels,
    resultMap,
    updateResultOfLevel,
  };
};
