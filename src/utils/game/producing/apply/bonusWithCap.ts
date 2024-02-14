import {durationOfDay} from '@/const/common';
import {ProducingRateOfItem} from '@/types/game/producing/rate';
import {ApplyBonusCommonOpts} from '@/utils/game/producing/apply/type';


type ApplyBonusWithCappingOpts<T extends ProducingRateOfItem | null> = ApplyBonusCommonOpts<T> & {
  maxFrequency: number,
};

export const applyBonusWithCapping = <T extends ProducingRateOfItem | null>({
  data,
  bonus,
  strengthMultiplier,
  producingState,
  maxFrequency,
}: ApplyBonusWithCappingOpts<T>): T => {
  if (!data) {
    return data;
  }

  const {stamina} = bonus;
  const staminaBonus = stamina.multiplier[producingState];

  const frequency = Math.max(data.frequency / (staminaBonus ?? 0), maxFrequency);
  const quantity = durationOfDay / frequency;

  return {
    ...data,
    frequency,
    quantity,
    energy: data.energy * quantity * strengthMultiplier,
  };
};
