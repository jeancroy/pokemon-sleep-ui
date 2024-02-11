import {RatingWorkerOpts} from '@/types/game/pokemon/rating/request';
import {RatingResultOfLevel} from '@/types/game/pokemon/rating/result';
import {calculateRatingResultOfCategory} from '@/utils/game/rating/calc/category';
import {calculateRatingResultOfCrossSpecies} from '@/utils/game/rating/calc/promises/cross';
import {calculateRatingResultOfIntraSpecies} from '@/utils/game/rating/calc/promises/intra';
import {
  calculateRatingResultOfIntraSpeciesSameIngredient,
} from '@/utils/game/rating/calc/promises/intraSameIngredient';


export const calculateRatingResultOfLevel = async (opts: RatingWorkerOpts): Promise<RatingResultOfLevel> => {
  const {level} = opts;

  const [
    intra,
    intraSameIngredient,
    cross,
  ] = await Promise.all([
    calculateRatingResultOfCategory({
      ...opts,
      getPromises: () => calculateRatingResultOfIntraSpecies(opts),
    }),
    calculateRatingResultOfCategory({
      ...opts,
      getPromises: ({currentCombination}) => calculateRatingResultOfIntraSpeciesSameIngredient({
        currentCombination,
        ...opts,
      }),
    }),
    calculateRatingResultOfCategory({
      ...opts,
      getPromises: ({currentCombination}) => calculateRatingResultOfCrossSpecies({
        currentCombination,
        ...opts,
      }),
    }),
  ]);

  return {
    level,
    result: {intra, intraSameIngredient, cross},
  };
};
