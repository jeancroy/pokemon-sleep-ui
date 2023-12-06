import {maxTeamMemberCount} from '@/const/game/production';
import {TeamMakerRateAtMaxPotentialData} from '@/ui/team/maker/calc/type';
import {toSum} from '@/utils/array';
import {getTotalOfPokemonProducingRate} from '@/utils/game/producing/rateReducer';


type GetTeamMakerCandidatesOpts = {
  ratesAtMax: TeamMakerRateAtMaxPotentialData[],
};

export const getTeamMakerCandidates = ({
  ratesAtMax,
}: GetTeamMakerCandidatesOpts): TeamMakerRateAtMaxPotentialData[] => {
  if (ratesAtMax.length <= maxTeamMemberCount) {
    return ratesAtMax;
  }

  const topComp = ratesAtMax.slice(0, maxTeamMemberCount);
  const stopThreshold = toSum(topComp.map(({rate}) => (
    getTotalOfPokemonProducingRate({rate: rate.rate.original, state: 'equivalent'}).energy
  )));

  const ret: TeamMakerRateAtMaxPotentialData[] = topComp;
  for (let idx = maxTeamMemberCount; idx <= ratesAtMax.length; idx++) {
    const tail = ratesAtMax[idx];

    const currentComp = ratesAtMax.slice(idx - maxTeamMemberCount + 1, idx + 1);
    const currentCompTotalStrength = toSum(currentComp.map(({rate}) => (
      getTotalOfPokemonProducingRate({rate: rate.rate.final, state: 'equivalent'}).energy
    )));

    if (currentCompTotalStrength < stopThreshold) {
      break;
    }

    ret.push(tail);
  }

  return ret;
};