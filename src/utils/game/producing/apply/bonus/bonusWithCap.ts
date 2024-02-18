import {durationOfDay} from '@/const/common';
import {ProducingRateOfBranch} from '@/types/game/producing/rate';
import {ApplyBonusCommonOpts} from '@/utils/game/producing/apply/bonus/type';


type ApplyBonusWithCappingOpts = ApplyBonusCommonOpts & {
  maxFrequency: number,
};

export const applyBonusWithCapping = ({
  rateBase,
  bonus,
  strengthMultiplier,
  producingState,
  maxFrequency,
}: ApplyBonusWithCappingOpts): ProducingRateOfBranch => {
  if (!rateBase) {
    return rateBase;
  }

  const {stamina} = bonus;
  const staminaBonus = stamina.multiplier[producingState];

  const frequency = Math.max(rateBase.frequency / (staminaBonus ?? 0), maxFrequency);
  const quantity = durationOfDay / frequency;

  return {
    ...rateBase,
    frequency,
    quantity,
    energy: rateBase.energy * quantity * strengthMultiplier,
  };
};
