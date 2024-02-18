import {ProducingRateOfBranch} from '@/types/game/producing/rate';
import {ApplyBonusCommonOpts} from '@/utils/game/producing/apply/type';


export const applyBonus = ({
  bonus,
  strengthMultiplier,
  producingState,
  rateBase,
}: ApplyBonusCommonOpts): ProducingRateOfBranch => {
  if (!rateBase) {
    return rateBase;
  }

  const {stamina} = bonus;
  const staminaBonus = stamina.multiplier[producingState] ?? 0;

  return {
    ...rateBase,
    frequency: rateBase.frequency / staminaBonus,
    quantity: rateBase.quantity * staminaBonus,
    energy: rateBase.energy * staminaBonus * strengthMultiplier,
  };
};
