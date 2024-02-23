import {durationOfDay} from '@/const/common';
import {EffectiveBonus} from '@/types/game/bonus/main';
import {ProductionOfDrop} from '@/types/game/producing/rate/base';
import {SleepSessionInfo} from '@/types/game/sleep';
import {toFinalProductionFromBase} from '@/utils/game/producing/toFinal/utils';


export type ToFinalProductionForAwakeOpts = {
  base: ProductionOfDrop,
  bonus: EffectiveBonus,
  sleepSessionInfo: SleepSessionInfo,
};

export const toFinalProductionForAwake = ({
  base,
  bonus,
  sleepSessionInfo,
}: ToFinalProductionForAwakeOpts): ProductionOfDrop => {
  const {stamina} = bonus;
  const staminaBonus = stamina.multiplier.awake ?? 0;

  const awakeRatio = sleepSessionInfo.duration.awake / durationOfDay;
  const efficiency = staminaBonus * awakeRatio;

  return toFinalProductionFromBase({
    base,
    override: {
      qty: base.qty * efficiency,
      strength: base.strength * efficiency,
      frequency: base.frequency / staminaBonus,
    },
  });
};
