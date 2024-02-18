import {EffectiveBonus} from '@/types/game/bonus/main';
import {ProducingRateOfBranch} from '@/types/game/producing/rate';
import {ProducingState} from '@/types/game/producing/state';


export type ApplyBonusCommonOpts = {
  bonus: EffectiveBonus,
  strengthMultiplier: number,
  producingState: ProducingState,
  rateBase: ProducingRateOfBranch,
};
