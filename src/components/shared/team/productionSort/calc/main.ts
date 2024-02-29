import {
  teamMemberProductionSorterGetter,
  teamMemberProductionSortingBasisInAsc,
} from '@/components/shared/team/productionSort/calc/const';
import {TeamMemberProduction, TeamMemberProductionSortingBasis} from '@/types/game/team/production';


export const sortTeamMemberProduction = (
  basis: TeamMemberProductionSortingBasis,
) => (
  a: TeamMemberProduction, b: TeamMemberProduction,
): number => {
  const sorterGetter = teamMemberProductionSorterGetter[basis];

  let comparer = sorterGetter(a) - sorterGetter(b);

  if (comparer !== 0 && !teamMemberProductionSortingBasisInAsc.some((basisInAsc) => basisInAsc === basis)) {
    comparer *= -1;
  }

  return comparer;
};
