import {PokemonProduction} from '@/types/game/producing/rate/main';
import {SleepSession} from '@/types/game/sleep';


export type GetNoSkillProbabilityOpts = {
  rate: PokemonProduction,
  sleepSession: SleepSession,
};

export const getNoSkillProbability = ({
  rate,
  sleepSession,
}: GetNoSkillProbabilityOpts): number | null => {
  const {fullPackStats, params} = rate;
  const {ratePercent} = params.skillTrigger;

  if (!ratePercent) {
    return null;
  }

  const statsOfSleep = fullPackStats.bySleep[sleepSession];
  if (!statsOfSleep) {
    return null;
  }

  const {helpCount} = statsOfSleep;

  return (1 - ratePercent / 100) ** helpCount.vacant;
};
