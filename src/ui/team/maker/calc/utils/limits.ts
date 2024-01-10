import {getTeamMakerDataSorter} from '@/ui/team/maker/calc/getSorter';
import {TeamMakerBasisValue, TeamMakerPokemonLimits} from '@/ui/team/maker/type/common';
import {TeamMakerBasis} from '@/ui/team/maker/type/input';
import {maxIngredientCounters, minIngredientCounters} from '@/utils/game/ingredientCounter';


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

export const mergeTeamMakerPokemonLimits = (limits: TeamMakerPokemonLimits[]): TeamMakerPokemonLimits => {
  return limits.reduce((stacked, current) => ({
    ...stacked,
    best: {
      strength: Math.max(stacked.best.strength, current.best.strength),
      mealCoverage: {
        byIngredient: maxIngredientCounters([
          stacked.best.mealCoverage.byIngredient,
          current.best.mealCoverage.byIngredient,
        ]),
        total: Math.max(stacked.best.mealCoverage.total, current.best.mealCoverage.total),
      },
    },
    worst: {
      strength: Math.min(stacked.worst.strength, current.worst.strength),
      mealCoverage: {
        byIngredient: minIngredientCounters([
          stacked.worst.mealCoverage.byIngredient,
          current.worst.mealCoverage.byIngredient,
        ]),
        total: Math.min(stacked.worst.mealCoverage.total, current.worst.mealCoverage.total),
      },
    },
  }), limits[0] satisfies TeamMakerPokemonLimits);
};
