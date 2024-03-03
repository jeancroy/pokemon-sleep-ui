import {ProducingState} from '@/types/game/producing/state';
import {SleepSessionData, SleepSessionInfo} from '@/types/game/sleep';
import {StaminaEventLog} from '@/types/game/stamina/event';
import {CookingMeal} from '@/types/userData/config/cooking/meal';


export type EfficiencyInterval = {
  efficiency: number,
  duration: number,
};

// Help count during sleep is not handled here as it involves inventory stats
export type EfficiencyIntervalsByCookingMeal = {[meal in CookingMeal]: EfficiencyInterval[]};

export type EfficiencyIntervalsBySleepSession = SleepSessionData<EfficiencyInterval[]>;

export type StaminaEfficiencyCounter<TValue = number> = {[state in ProducingState]: TValue} & {
  average: TValue,
};

export type StaminaEfficiencyState = keyof StaminaEfficiencyCounter<never>;

export type StaminaEfficiency = {
  logs: StaminaEventLog[],
  // This multiplier is the average coming from the integral of the stamina log.
  // Since helps trigger more at the earlier stages during sleep,
  //  this multiplier should NOT be used for calculating any production related stats.
  // This is solely for easy displaying purpose.
  multiplier: StaminaEfficiencyCounter<number | null>,
  sleepSessionInfo: SleepSessionInfo,
  efficiencyIntervals: {
    sleep: EfficiencyIntervalsBySleepSession,
  },
};
