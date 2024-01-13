import {getTeamMakerDataSorter} from '@/ui/team/maker/calc/getSorter';
import {TeamMakerBasisValue} from '@/ui/team/maker/type/common';
import {TeamMakerBasis} from '@/ui/team/maker/type/input';
import {TeamMakerResultComp} from '@/ui/team/maker/type/result';
import {addIngredientCount} from '@/utils/game/ingredientCounter';


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
      ingredientProduction: addIngredientCount([prev, curr]),
    }),
    {
      strength: 0,
      mealCoverage: {byIngredient: {}, total: 0},
      ingredientProduction: {},
    },
  );
};
