import React from 'react';

import {generateInitialRatingResult} from '@/components/shared/pokemon/rating/utils';
import {RatingResultOfLevel} from '@/types/game/pokemon/rating/result';
import {UseCalculatePokeInBoxRatingReturn} from '@/ui/team/pokebox/content/pokeInBox/type';
import {toRatingWorkerOpts} from '@/ui/team/pokebox/content/pokeInBox/utils';
import {pokeboxRatingWorkerPool} from '@/ui/team/pokebox/content/pokeInBox/worker/rating/workerPool';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';


export const useCalculatePokeInBoxRating = (opts: PokeInBoxCommonProps): UseCalculatePokeInBoxRatingReturn => {
  const {pokeInBox} = opts;

  const [loading, setLoading] = React.useState(false);
  const [
    result,
    setResult,
  ] = React.useState<RatingResultOfLevel>(generateInitialRatingResult(pokeInBox.level));

  React.useEffect(() => {
    setLoading(true);

    pokeboxRatingWorkerPool.queue(async (rate) => {
      const calculatedResult = await rate(toRatingWorkerOpts(opts));

      if (calculatedResult) {
        setResult(calculatedResult);
      }

      setLoading(false);

      if (!calculatedResult) {
        console.warn(`Failed to calculate the rating of ${pokeInBox.uuid}`);
        return;
      }
    });
  }, [pokeInBox]);

  return {loading, result};
};
