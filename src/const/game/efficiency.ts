import {EfficiencyBreakPoint} from '@/types/game/producing/efficiency';


export const efficiencyBeforeBreakPoint: {[breakPoint in EfficiencyBreakPoint]: number} = {
  80: 1 / 0.45,
  60: 1 / 0.52,
  40: 1 / 0.62,
  20: 1 / 0.71,
  0: 1,
};
