import {TeamMakerBasisValue} from '@/ui/team/maker/type/common';
import {TeamMakerBasis} from '@/ui/team/maker/type/input';
import {subtractIngredientCount} from '@/utils/game/ingredient/counter';
import {isNotNullish} from '@/utils/type';


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
    // If `current` total meal coverage is > 1, meaning that the requirements is likely satisfied,
    // then `current` shouldn't get excluded by this checking function
    if (current.mealCoverage.total > 1) {
      return false;
    }

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
