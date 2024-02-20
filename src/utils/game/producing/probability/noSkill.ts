import {PokemonProducingRate} from '@/types/game/producing/rate';
import {SleepSession} from '@/types/game/sleep';


export type GetNoSkillProbabilityOpts = {
  rate: PokemonProducingRate,
  sleepSession: SleepSession,
};

export const getNoSkillProbability = ({
  rate,
  sleepSession,
}: GetNoSkillProbabilityOpts): number | null => {
  const {skillRatePercent, fullPackStats} = rate;

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
