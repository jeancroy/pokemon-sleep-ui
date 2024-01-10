import {isCurrentTeamMakerBasisValueWorse} from '@/ui/team/maker/calc/utils/compare';
import {getSortedTeamMakerPokemonLimits} from '@/ui/team/maker/calc/utils/limits';
import {sumTeamMakerBasisValue} from '@/ui/team/maker/calc/utils/reducer';
import {TeamMakerCandidateData, TeamMakerPokemonLimits} from '@/ui/team/maker/type/common';
import {TeamMakerInput} from '@/ui/team/maker/type/input';
import {generateSegments} from '@/utils/array';


type GetTeamMakerCandidatesOpts = {
  input: TeamMakerInput,
  pokemonLimits: TeamMakerPokemonLimits[],
};

const getTeamMakerCandidatesInitialMap = ({
  input,
  pokemonLimits,
}: GetTeamMakerCandidatesOpts) => {
  const {basis} = input;

  if (basis === 'mealCoverage') {
    return getTeamMakerCandidates({input: {...input, basis: 'strength'}, pokemonLimits});
  }

  return new Map();
};

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
  const topBest = pokemonLimits.slice(0, memberCount);

  const stopThreshold = sumTeamMakerBasisValue(topWorst.map(({worst}) => worst));

  const candidateData: Map<string, TeamMakerCandidateData> = getTeamMakerCandidatesInitialMap(opts);
  for (const {payload} of [...topWorst, ...topBest]) {
    candidateData.set(payload.refData.pokeInBox.uuid, {payload});
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

    candidateData.set(
      tail.payload.refData.pokeInBox.uuid,
      {payload: tail.payload},
    );
  }

  return candidateData;
};
