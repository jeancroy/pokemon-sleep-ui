import {ExtraTastyInfo, ExtraTastyInfoUnit} from '@/types/game/cooking/extraTasty';
import {getAverage} from '@/utils/number/average';


export const convertExtraTastyUnitsToInfo = (units: ExtraTastyInfoUnit[]): ExtraTastyInfo => {
  return {
    byMeal: units,
    overall: {
      rate: getAverage(units.map(({rate}) => rate)),
      multiplier: getAverage(units.map(({multiplier}) => multiplier)),
    },
  };
};
