import {Meal} from '@/types/game/meal/main';
import {PokemonProduction} from '@/types/game/producing/rate/main';
import {TeamMakerBasisValue} from '@/ui/team/maker/type/common';
import {getMealCoverage} from '@/utils/game/cooking';
import {toIngredientProductionCounterFromPokemonRate} from '@/utils/game/producing/ingredient/utils';
import {getTotalPokemonProduction} from '@/utils/game/producing/reducer/total/common';


export type GetTeamMakerBasisValueOpts = {
  pokemonRate: PokemonProduction,
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
    strength: getTotalPokemonProduction({rate: pokemonRate, state: 'equivalent'}).strength,
    mealCoverage: getMealCoverage({
      meals: targetMeals,
      ingredientProduction,
      period: pokemonRate.params.period,
    }),
    ingredientProduction,
  };
};
