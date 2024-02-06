import {ProducingRateOfItem} from '@/types/game/producing/rate';
import {ApplyBonusCommonOpts} from '@/utils/game/producing/apply/type';


type ApplyBonusWithMainSkillCappingOpts<T extends ProducingRateOfItem | null> = ApplyBonusCommonOpts<T> & {
  maxCount: number,
  cappingDuration: number,
};

export const applyBonusWithMainSkillCapping = <T extends ProducingRateOfItem | null>({
  data,
  bonus,
  strengthMultiplier,
  producingState,
  maxCount,
  cappingDuration,
}: ApplyBonusWithMainSkillCappingOpts<T>): T => {
  if (!data) {
    return data;
  }

  const {stamina} = bonus;
  const staminaBonus = stamina.multiplier[producingState];

  const frequency = data.frequency / (staminaBonus ?? 0);
  const quantity = Math.min(cappingDuration / frequency, maxCount);

  return {
    ...data,
    frequency,
    quantity,
    energy: data.energy * quantity * strengthMultiplier,
  };
};
