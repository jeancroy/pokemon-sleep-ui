import {ProducingState} from '@/types/game/producing/state';
import {SleepSessionInfo, SleepSessionData} from '@/types/game/sleep';
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
  // This multiplier is the average coming from the integral of the stamina log.
  // Since helps trigger more at the earlier stages during sleep,
  //  this multiplier should NOT be used for calculating any production related stats.
  // This is solely for easy displaying purpose.
  multiplier: StaminaEfficiencyCounter<number | null>,
  sleepSessionInfo: SleepSessionInfo,
  intervalsDuringSleep: SleepSessionData<EfficiencyInterval[]>,
};
