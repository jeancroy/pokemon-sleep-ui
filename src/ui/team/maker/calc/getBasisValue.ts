import {Meal} from '@/types/game/meal/main';
import {PokemonProducingRate} from '@/types/game/producing/rate/main';
import {TeamMakerBasisValue} from '@/ui/team/maker/type/common';
import {getMealCoverage} from '@/utils/game/cooking';
import {toIngredientProductionCounterFromPokemonRate} from '@/utils/game/producing/ingredient/utils';
import {getTotalOfPokemonProducingRate} from '@/utils/game/producing/reducer/sum';


export type GetTeamMakerBasisValueOpts = {
  pokemonRate: PokemonProducingRate,
  targetMeals: Meal[],
};

export const getTeamMakerBasisValue = ({
  pokemonRate,
  targetMeals,
}: GetTeamMakerBasisValueOpts): TeamMakerBasisValue => {
  const ingredientProduction = toIngredientProductionCounterFromPokemonRate({
    pokemonRate,
    state: 'equivalent',
  });

  return {
    strength: getTotalOfPokemonProducingRate({rate: pokemonRate, state: 'equivalent'}).strength,
    mealCoverage: getMealCoverage({
      meals: targetMeals,
      ingredientProduction,
      period: pokemonRate.period,
    }),
    ingredientProduction,
  };
};
