import {initialRatingResultOfCategory} from '@/const/game/rating';
import {RatingBasis} from '@/types/game/pokemon/rating/config';
import {RatingResultOfLevel} from '@/types/game/pokemon/rating/result';
import {formatFloat, formatFloat3} from '@/utils/number/format/regular';
import {Nullable} from '@/utils/type';


export const generateInitialRatingResult = (level: number): RatingResultOfLevel => {
  return {
    level,
    result: {
      intra: initialRatingResultOfCategory,
      intraSameIngredient: initialRatingResultOfCategory,
      cross: initialRatingResultOfCategory,
    },
  };
};

type GetFormattedRatingValueOpts = {
  basis: Nullable<RatingBasis>,
  value: number,
};

export const getFormattedRatingValue = ({basis, value}: GetFormattedRatingValueOpts): string => {
  if (!basis) {
    return '-';
  }

  if (basis === 'mealCoverage') {
    return `${formatFloat3(value * 100)}%`;
  }

  if (basis === 'mainSkillTriggerCount') {
    return formatFloat3(value);
  }

  return formatFloat(value);
};
