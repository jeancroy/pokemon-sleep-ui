import {ProducingRateOfItem} from '@/types/game/producing/rate';
import {ApplyBonusCommonOpts} from '@/utils/game/producing/apply/type';


type ApplyBonusOpts<T extends ProducingRateOfItem | null> = ApplyBonusCommonOpts<T>;

export const applyBonus = <T extends ProducingRateOfItem | null>({
  bonus,
  energyMultiplier,
  producingState,
  data,
}: ApplyBonusOpts<T>): T => {
  if (!data) {
    return data;
  }

  const {stamina} = bonus;
  const staminaBonus = stamina.multiplier[producingState];

  return {
    ...data,
    frequency: data.frequency / staminaBonus,
    quantity: data.quantity * staminaBonus,
    energy: data.energy * staminaBonus * energyMultiplier,
  };
};
