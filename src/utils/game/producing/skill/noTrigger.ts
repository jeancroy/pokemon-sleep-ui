import {FullPackStatsOfSleep} from '@/types/game/producing/inventory';
import {PokemonProductionSkillTriggerParams} from '@/types/game/producing/rate/params';


export type GetNoSkillProbabilityOpts = {
  fullPackStatsOfSleep: FullPackStatsOfSleep,
  skillTrigger: PokemonProductionSkillTriggerParams,
};

export const getNoSkillProbability = ({
  fullPackStatsOfSleep,
  skillTrigger,
}: GetNoSkillProbabilityOpts): number | null => {
  const {ratePercent} = skillTrigger;

  if (!ratePercent || !fullPackStatsOfSleep) {
    return null;
  }

  const {helpCount} = fullPackStatsOfSleep;

  return (1 - ratePercent / 100) ** helpCount.vacant;
};
