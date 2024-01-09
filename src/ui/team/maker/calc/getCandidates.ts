import {
  getSortedTeamMakerPokemonLimits,
  isCurrentTeamMakerBasisValueWorse,
  sumTeamMakerBasisValue,
} from '@/ui/team/maker/calc/utils';
import {TeamMakerCandidateData, TeamMakerPokemonLimits} from '@/ui/team/maker/type/common';
import {TeamMakerInput} from '@/ui/team/maker/type/input';
import {generateSegments} from '@/utils/array';


type GetTeamMakerCandidatesOpts = {
  input: TeamMakerInput,
  pokemonLimits: TeamMakerPokemonLimits[],
};

export const getTeamMakerCandidates = ({
  input,
  pokemonLimits,
}: GetTeamMakerCandidatesOpts): TeamMakerCandidateData[] => {
  const {basis, memberCount} = input;

  if (pokemonLimits.length <= memberCount) {
    return pokemonLimits.map(({payload}) => ({payload}));
  }

  const sortedWorst = getSortedTeamMakerPokemonLimits({
    basis: input.basis,
    pokemonLimits,
    getBasisValue: ({worst}) => worst,
  });
  const topWorst = sortedWorst.slice(0, memberCount);

  const sortedBest = getSortedTeamMakerPokemonLimits({
    basis: input.basis,
    pokemonLimits,
    getBasisValue: ({best}) => best,

  });
  const topBest = pokemonLimits.slice(0, memberCount);

  const stopThreshold = sumTeamMakerBasisValue(topWorst.map(({worst}) => worst));

  const candidateData: Map<string, TeamMakerCandidateData> = new Map();
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

  return [...candidateData.values()];
};
