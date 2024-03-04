import {ExtraTastyInfo, ExtraTastyInfoUnit, ExtraTastyByMealAlgorithmInfo} from '@/types/game/cooking/extraTasty';
import {getAverage} from '@/utils/number/average';


export const convertExtraTastyUnitsToInfo =
    (units: ExtraTastyInfoUnit[], traces: ExtraTastyByMealAlgorithmInfo[]): ExtraTastyInfo => {
      return {
        byMeal: units,
        overall: {
          rate: getAverage(units.map(({rate}) => rate)),
          multiplier: getAverage(units.map(({multiplier}) => multiplier)),
        },
        byMealAlgorithmInfo: traces,
      };
    };
