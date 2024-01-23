import {MealStrengthInfo} from '@/types/game/meal/info';
import {formatInt} from '@/utils/number/format';


type FormatMealStrengthInfoOpts = {
  info: MealStrengthInfo,
  includeBonusRate?: boolean,
};

export const formatMealStrengthInfo = ({
  info,
  includeBonusRate,
}: FormatMealStrengthInfoOpts): string => {
  const {
    strengthAfterRarity,
    strengthFinal,
    bonus,
  } = info;

  if (includeBonusRate) {
    const bonusPercent = bonus.total * 100 - 100;

    return `${formatInt(strengthAfterRarity)} (${formatInt(strengthFinal)} / +${formatInt(bonusPercent)}%)`;
  }

  return `${formatInt(strengthAfterRarity)} (${formatInt(strengthFinal)})`;
};
