import {mealsPerWeek} from '@/const/game/cooking/common';
import {extraTastyBasePercent, extraTastyMultiplier} from '@/const/game/cooking/extraTasty';
import {ExtraTastyInfo, ExtraTastyInfoUnit} from '@/types/game/cooking/extraTasty';
import {convertExtraTastyUnitsToInfo} from '@/utils/game/cooking/extraTasty/convert';
import {getExtraTastyTiming} from '@/utils/game/cooking/extraTasty/utils';


export const generateDefaultExtraTastyInfoUnit = (mealIdx: number): ExtraTastyInfoUnit => {
  const timing = getExtraTastyTiming(mealIdx);

  return {
    rate: extraTastyBasePercent[timing] / 100,
    multiplier: extraTastyMultiplier[timing],
  };
};

export const generateDefaultExtraTastyInfo = (): ExtraTastyInfo => {
  return convertExtraTastyUnitsToInfo([...Array(mealsPerWeek).keys()].map(generateDefaultExtraTastyInfoUnit));
};
