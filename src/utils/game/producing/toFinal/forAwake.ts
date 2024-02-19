import {durationOfDay} from '@/const/common';
import {EffectiveBonus} from '@/types/game/bonus/main';
import {ProducingRateOfDrop} from '@/types/game/producing/rate';
import {SleepSessionInfo} from '@/types/game/sleep';
import {toFinalProducingRateFromBase} from '@/utils/game/producing/toFinal/utils';


export type ToFinalProducingRateForAwakeOpts = {
  base: ProducingRateOfDrop,
  bonus: EffectiveBonus,
  sleepSessionInfo: SleepSessionInfo,
};

export const toFinalProducingRateForAwake = ({
  base,
  bonus,
  sleepSessionInfo,
}: ToFinalProducingRateForAwakeOpts): ProducingRateOfDrop => {
  const {stamina} = bonus;
  const staminaBonus = stamina.multiplier.awake ?? 0;

  const awakeRatio = sleepSessionInfo.duration.awake / durationOfDay;
  const efficiency = staminaBonus * awakeRatio;

  return toFinalProducingRateFromBase({
    base,
    override: {
      qty: base.qty * efficiency,
      strength: base.strength * efficiency,
      frequency: base.frequency / staminaBonus,
    },
  });
};
