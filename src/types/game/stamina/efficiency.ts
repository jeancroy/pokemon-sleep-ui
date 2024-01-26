import {ProducingState} from '@/types/game/producing/state';
import {SleepSessions} from '@/types/game/sleep';
import {StaminaEventLog} from '@/types/game/stamina/event';


export type EfficiencyInterval = {
  efficiency: number,
  duration: number,
};

export type StaminaEfficiencyCounter<TValue = number> = {[state in ProducingState]: TValue} & {
  average: TValue,
};

export type StaminaEfficiency = {
  logs: StaminaEventLog[],
  multiplier: StaminaEfficiencyCounter<number | null>,
  intervalsDuringSleep: SleepSessions<EfficiencyInterval[]>,
};
