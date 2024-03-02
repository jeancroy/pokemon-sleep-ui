import React from 'react';

import {generateInitialRatingResult} from '@/components/shared/pokemon/rating/utils';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {RatingResultOfLevel} from '@/types/game/pokemon/rating/result';
import {toRatingWorkerOpts} from '@/ui/team/pokebox/content/pokeInBox/worker/rating/main';
import {UseCalculatePokeInBoxRatingReturn} from '@/ui/team/pokebox/content/pokeInBox/worker/rating/type';
import {pokeboxRatingWorkerPool} from '@/ui/team/pokebox/content/pokeInBox/worker/rating/workerPool';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';


export const useCalculatePokeInBoxRating = ({
  pokeInBox,
  pokemon,
  snorlaxFavorite,
  bundle,
  ratingBasis,
}: PokeInBoxCommonProps): UseCalculatePokeInBoxRatingReturn => {
  const {
    pokedexMap,
    pokemonProducingParamsMap,
    berryDataMap,
    ingredientMap,
    ingredientChainMap,
    mainSkillMap,
    subSkillMap,
    mealMap,
    cookingRecoveryData,
    recipeLevelData,
    eventStrengthMultiplierData,
  } = useCommonServerData();

  const [loading, setLoading] = React.useState(false);
  const [
    result,
    setResult,
  ] = React.useState<RatingResultOfLevel>(generateInitialRatingResult(pokeInBox.level));

  React.useEffect(() => {
    setLoading(true);

    pokeboxRatingWorkerPool.queue(async (rate) => {
      const calculatedResult = await rate(toRatingWorkerOpts({
        pokeInBox,
        pokemon,
        pokedexMap,
        pokemonProducingParamsMap,
        berryDataMap,
        ingredientMap,
        ingredientChainMap,
        mainSkillMap,
        subSkillMap,
        mealMap,
        cookingRecoveryData,
        recipeLevelData,
        eventStrengthMultiplierData,
        snorlaxFavorite,
        bundle,
        ratingBasis,
      }));

      if (calculatedResult) {
        setResult(calculatedResult);
      }

      setLoading(false);

      if (!calculatedResult) {
        console.warn(`Failed to calculate the rating of ${pokeInBox.uuid}`);
      }
    });
  }, [pokeInBox]);

  return {loading, result};
};
