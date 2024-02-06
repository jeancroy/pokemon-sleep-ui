import {MapBonus} from '@/types/game/bonus/map';
import {StrengthMultiplier} from '@/types/game/bonus/strength';
import {StaminaEfficiency} from '@/types/game/stamina/efficiency';


export type UserBonus = {
  map: MapBonus,
  overall: number,
};

export type EffectiveBonus = {
  mapMultiplier: number,
  stamina: StaminaEfficiency,
  overallMultiplier: number,
  strengthMultiplier: StrengthMultiplier,
};
