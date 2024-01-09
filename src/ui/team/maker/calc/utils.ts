import {getTeamMakerDataSorter} from '@/ui/team/maker/calc/getSorter';
import {TeamMakerBasisValue, TeamMakerPokemonLimits} from '@/ui/team/maker/type/common';
import {TeamMakerBasis} from '@/ui/team/maker/type/input';
import {TeamMakerResultComp} from '@/ui/team/maker/type/result';
import {addIngredientCount, subtractIngredientCount} from '@/utils/game/ingredientCounter';
import {isNotNullish} from '@/utils/type';


type ReduceTeamMakerResultCompOpts = {
  comps: TeamMakerResultComp[],
  basis: TeamMakerBasis,
  count: number,
};

export const reduceTeamMakerResultComp = ({
  comps,
  basis,
  count,
}: ReduceTeamMakerResultCompOpts): TeamMakerResultComp[] => {
  const sorter = getTeamMakerDataSorter<TeamMakerResultComp>({
    basis,
    getBasisValue: ({basisValue}) => basisValue,
  });

  return comps.sort(sorter).slice(0, count);
};

export const sumTeamMakerBasisValue = (values: TeamMakerBasisValue[]): TeamMakerBasisValue => {
  return values.reduce<TeamMakerBasisValue>(
    (prev, curr) => ({
      strength: prev.strength + curr.strength,
      mealCoverage: {
        byIngredient: addIngredientCount([
          prev.mealCoverage.byIngredient,
          curr.mealCoverage.byIngredient,
        ]),
        total: prev.mealCoverage.total + curr.mealCoverage.total,
      },
    }),
    {
      strength: 0,
      mealCoverage: {byIngredient: {}, total: 0},
    },
  );
};

type IsCurrentTeamMakerBasisValueWorseOpts = {
  basis: TeamMakerBasis,
  current: TeamMakerBasisValue,
  baseline: TeamMakerBasisValue,
};

export const isCurrentTeamMakerBasisValueWorse = ({
  basis,
  current,
  baseline,
}: IsCurrentTeamMakerBasisValueWorseOpts) => {
  if (basis === 'strength') {
    return current.strength < baseline.strength;
  }

  if (basis === 'mealCoverage') {
    const coverageDiff = Math.max(...Object.values(subtractIngredientCount(
      current.mealCoverage.byIngredient,
      baseline.mealCoverage.byIngredient,
      {includeNegativeResult: true},
    )).filter(isNotNullish));

    if (coverageDiff !== -Infinity && Math.abs(coverageDiff) > 0) {
      return coverageDiff < 0;
    }

    return current.strength < baseline.strength;
  }

  throw new Error(`Unhandled team maker basis of ${basis satisfies never} during data comparison`);
};

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

  return pokemonLimits.sort(originalRateSorter);
};
