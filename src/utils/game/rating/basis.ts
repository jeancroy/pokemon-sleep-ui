import {Meal} from '@/types/game/meal/main';
import {RatingBasis} from '@/types/game/pokemon/rating/config';
import {PokemonProduction} from '@/types/game/producing/rate/main';
import {toSum} from '@/utils/array';
import {getMealCoverage} from '@/utils/game/cooking';
import {toIngredientProductionCounterFromPokemonRate} from '@/utils/game/producing/ingredient/utils';
import {getTotalStrengthOfPokemonProduction} from '@/utils/game/producing/reducer/total/strength';


type GetRatingBasisValueOpts = {
  rate: PokemonProduction,
  basis: RatingBasis,
  targetMeals: Meal[],
};

export const getRatingBasisValue = ({
  rate,
  basis,
  targetMeals,
}: GetRatingBasisValueOpts): number => {
  if (basis === 'totalStrength') {
    return getTotalStrengthOfPokemonProduction(rate);
  }

  if (basis === 'ingredientProduction') {
    return toSum(Object.values(rate.ingredient).map(({strength}) => strength.equivalent));
  }

  if (basis === 'mealCoverage') {
    return getMealCoverage({
      meals: targetMeals,
      ingredientProduction: toIngredientProductionCounterFromPokemonRate({
        pokemonRate: rate,
        state: 'equivalent',
      }),
      period: rate.params.period,
    }).total;
  }

  if (basis === 'mainSkillTriggerCount') {
    return rate.skill.qty.equivalent;
  }

  throw new Error(`Unhandled rating basis - ${basis satisfies never}`);
};
