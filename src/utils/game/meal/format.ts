import {MealStrengthInfo} from '@/types/game/meal/info';
import {formatInt} from '@/utils/number/format/regular';


type FormatMealStrengthInfoOpts = {
  info: MealStrengthInfo,
  includeBonusRate?: boolean,
};

export const formatMealStrengthInfo = ({
  info,
  includeBonusRate,
}: FormatMealStrengthInfoOpts): string => {
  const {
    strengthAfterBonus,
    strengthFinal,
    bonus,
  } = info;

  if (includeBonusRate) {
    const bonusPercent = bonus.total * 100 - 100;

    return `${formatInt(strengthAfterBonus)} (${formatInt(strengthFinal)} / +${formatInt(bonusPercent)}%)`;
  }

  return `${formatInt(strengthAfterBonus)} (${formatInt(strengthFinal)})`;
};
