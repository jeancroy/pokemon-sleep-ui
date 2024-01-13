import {getTeamMakerDataSorter} from '@/ui/team/maker/calc/getSorter';
import {TeamMakerBasisValue, TeamMakerPokemonLimits} from '@/ui/team/maker/type/common';
import {TeamMakerBasis} from '@/ui/team/maker/type/input';


type GetSortedTeamMakerPokemonLimitsOpts = {
  basis: TeamMakerBasis,
  pokemonLimits: TeamMakerPokemonLimits[],
  getBasisValue: (limits: TeamMakerPokemonLimits) => TeamMakerBasisValue,
};

export const getSortedTeamMakerPokemonLimits = ({
  basis,
  pokemonLimits,
  getBasisValue,
}: GetSortedTeamMakerPokemonLimitsOpts): TeamMakerPokemonLimits[] => {
  const originalRateSorter = getTeamMakerDataSorter<TeamMakerPokemonLimits>({
    basis,
    getBasisValue,
  });

  // Create another array to avoid mutating `pokemonLimits`
  return [...pokemonLimits].sort(originalRateSorter);
};
