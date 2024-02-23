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
  const {skillRatePercent} = params;

  if (!skillRatePercent) {
    return null;
  }

  const statsOfSleep = fullPackStats.bySleep[sleepSession];
  if (!statsOfSleep) {
    return null;
  }

  const {helpCount} = statsOfSleep;

  return (1 - skillRatePercent / 100) ** helpCount.vacant;
};
