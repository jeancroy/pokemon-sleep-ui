import {getTeamMakerCandidateInitialData} from '@/ui/team/maker/calc/getCandidates/initial/main';
import {GetTeamMakerCandidatesOpts} from '@/ui/team/maker/calc/getCandidates/type';
import {isCurrentTeamMakerBasisValueWorse} from '@/ui/team/maker/calc/utils/compare';
import {getSortedTeamMakerPokemonLimits} from '@/ui/team/maker/calc/utils/limits';
import {sumTeamMakerBasisValue} from '@/ui/team/maker/calc/utils/reducer';
import {TeamMakerCandidateData} from '@/ui/team/maker/type/common';
import {generateSegments} from '@/utils/array';


export const getTeamMakerCandidates = (opts: GetTeamMakerCandidatesOpts): Map<string, TeamMakerCandidateData> => {
  const {
    input,
    pokemonLimits,
  } = opts;
  const {basis, memberCount} = input;

  if (pokemonLimits.length <= memberCount) {
    return new Map<string, TeamMakerCandidateData>(pokemonLimits.map(({payload}) => [
      payload.refData.pokeInBox.uuid,
      {payload},
    ]));
  }

  const sortedWorst = getSortedTeamMakerPokemonLimits({
    basis,
    pokemonLimits,
    getBasisValue: ({worst}) => worst,
  });
  const topWorst = sortedWorst.slice(0, memberCount);

  const sortedBest = getSortedTeamMakerPokemonLimits({
    basis,
    pokemonLimits,
    getBasisValue: ({best}) => best,
  });
  const topBest = sortedBest.slice(0, memberCount);

  const stopThreshold = sumTeamMakerBasisValue(topWorst.map(({worst}) => worst));

  const {
    candidates,
    isLimitCheckingNotNeeded,
  } = getTeamMakerCandidateInitialData({
    ...opts,
    topBest,
    topWorst,
  });

  if (isLimitCheckingNotNeeded) {
    return candidates;
  }

  for (const currentComp of generateSegments(memberCount, sortedBest)) {
    const tail = currentComp.at(-1);
    if (!tail) {
      continue;
    }

    if (isCurrentTeamMakerBasisValueWorse({
      basis,
      current: sumTeamMakerBasisValue(currentComp.map(({best}) => best)),
      baseline: stopThreshold,
    })) {
      break;
    }

    candidates.set(
      tail.payload.refData.pokeInBox.uuid,
      {payload: tail.payload},
    );
  }

  return candidates;
};
