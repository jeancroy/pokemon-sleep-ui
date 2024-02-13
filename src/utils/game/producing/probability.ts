import {durationOfDay} from '@/const/common';
import {PokemonProducingRate} from '@/types/game/producing/rate';
import {ProducingStateWithPack} from '@/types/game/producing/state';
import {getFrequencyOfStateFromPokemonRate} from '@/utils/game/producing/frequency';


export type GetProbabilityOfNoSkillOpts = {
  rate: PokemonProducingRate,
  state: ProducingStateWithPack,
};

export const getProbabilityOfNoSkill = ({
  rate,
  state,
}: GetProbabilityOfNoSkillOpts): number | null => {
  const {skillRatePercent} = rate;

  if (!skillRatePercent) {
    return null;
  }

  const helpCountAllDay = durationOfDay / getFrequencyOfStateFromPokemonRate({rate, state});
  const helpCountDuringState = helpCountAllDay * rate.sleepStateSplit[state];

  if (!helpCountDuringState) {
    return null;
  }

  return (1 - skillRatePercent / 100) ** helpCountDuringState;
};
