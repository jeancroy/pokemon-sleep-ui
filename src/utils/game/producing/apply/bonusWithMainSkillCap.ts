import {durationOfDay} from '@/const/common';
import {ProducingRateOfItem} from '@/types/game/producing/rate';
import {SleepDurationInfo} from '@/types/game/sleep';
import {ApplyBonusCommonOpts} from '@/utils/game/producing/apply/type';


type ApplyBonusWithMainSkillCappingOpts<T extends ProducingRateOfItem | null> = ApplyBonusCommonOpts<T> & {
  timeToFullPack: number,
  sleepDurationInfo: SleepDurationInfo,
};

export const applyBonusWithMainSkillCapping = <T extends ProducingRateOfItem | null>({
  data,
  bonus,
  energyMultiplier,
  producingState,
  timeToFullPack,
  sleepDurationInfo,
}: ApplyBonusWithMainSkillCappingOpts<T>): T => {
  if (!data) {
    return data;
  }

  const {stamina} = bonus;
  const staminaBonus = stamina.multiplier[producingState];

  const frequency = Math.max(
    data.frequency / staminaBonus,
    Math.min(timeToFullPack, Math.max(...sleepDurationInfo.durations)),
  );
  const quantity = durationOfDay / frequency;

  return {
    ...data,
    frequency,
    quantity,
    energy: data.energy * quantity * energyMultiplier,
  };
};
