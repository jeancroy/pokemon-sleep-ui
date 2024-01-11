import {initialRatingResultOfCategory} from '@/const/game/rating';
import {RatingResultOfLevel} from '@/types/game/pokemon/rating/result';


export const generateInitialRatingResult = (level: number): RatingResultOfLevel => {
  return {
    level,
    result: {
      intra: initialRatingResultOfCategory,
      cross: initialRatingResultOfCategory,
    },
  };
};
