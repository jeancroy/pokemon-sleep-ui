import {defaultDrowsyPowerMultiplier} from '@/const/game/event';
import {EventDrowsyPowerMultiplierData} from '@/types/game/event/drowsyPowerMultiplier';


export const getCurrentDrowsyPowerMultiplier = ({current}: EventDrowsyPowerMultiplierData): number => {
  return current?.multiplier ?? defaultDrowsyPowerMultiplier;
};
