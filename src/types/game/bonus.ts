import {SleepMapId} from '@/types/game/sleepStyle';
import {StaminaEfficiency} from '@/types/game/stamina/efficiency';


export type MapBonus = {[id in SleepMapId]?: number};

export type UserBonus = {
  map: MapBonus,
  overall: number,
};

export type EffectiveBonus = {
  mapMultiplier: number,
  stamina: StaminaEfficiency,
  overallMultiplier: number,
};
