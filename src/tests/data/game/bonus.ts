import {EffectiveBonus} from '@/types/game/bonus';


export const testBonus: {[id in number]: EffectiveBonus} = {
  1: {
    mapMultiplier: 1.05,
    stamina: {
      logs: [], // ignore
      multiplier: {
        average: NaN, // ignore
        sleep1: 2.2,
        sleep2: 2.2,
        awake: 1.6,
      },
      intervalsDuringSleep: {
        primary: [], // ignore
        secondary: [], // ignore
      },
    },
    overallMultiplier: 1.2,
  },
};
