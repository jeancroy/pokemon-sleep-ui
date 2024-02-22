import {Meal} from '@/types/game/meal/main';
import {RatingBasis} from '@/types/game/pokemon/rating/config';
import {PokemonProducingRate} from '@/types/game/producing/rate/main';
import {toSum} from '@/utils/array';
import {getMealCoverage} from '@/utils/game/cooking';
import {toIngredientProductionCounterFromPokemonRate} from '@/utils/game/producing/ingredient/utils';
import {getTotalStrengthOfPokemonProducingRate} from '@/utils/game/producing/reducer/sum';


type GetRatingBasisValueOpts = {
  rate: PokemonProducingRate,
  basis: RatingBasis,
  targetMeals: Meal[],
};

export const getRatingBasisValue = ({
  rate,
  basis,
  targetMeals,
}: GetRatingBasisValueOpts): number => {
  if (basis === 'totalStrength') {
    return getTotalStrengthOfPokemonProducingRate(rate);
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
