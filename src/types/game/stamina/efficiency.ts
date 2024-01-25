import {ProducingState} from '@/types/game/producing/state';
import {StaminaEventLog} from '@/types/game/stamina/event';


export type EfficiencyInterval = {
  efficiency: number,
  duration: number,
};

export type StaminaEfficiencyCounter = {[state in ProducingState]: number} & {
  average: number,
};

export type StaminaEfficiency = {
  logs: StaminaEventLog[],
  multiplier: StaminaEfficiencyCounter,
};
