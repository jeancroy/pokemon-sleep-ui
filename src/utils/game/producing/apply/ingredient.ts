import {IngredientMultiplier} from '@/types/game/producing/multiplier';
import {PokemonProducingRate} from '@/types/game/producing/rate';
import {applyMultiplierToRateOfStates} from '@/utils/game/producing/apply/multiplier';
import {getIngredientMultiplierValue} from '@/utils/game/producing/ingredient/multiplier';


type ApplyIngredientMultiplierOpts = {
  rate: PokemonProducingRate,
  ingredientMultiplier: IngredientMultiplier,
};

export const applyIngredientMultiplier = ({
  rate,
  ingredientMultiplier,
}: ApplyIngredientMultiplierOpts): PokemonProducingRate => {
  return {
    ...rate,
    ingredient: Object.fromEntries(Object.values(rate.ingredient).map((rate) => [
      rate.id,
      applyMultiplierToRateOfStates({
        rate,
        target: ['strength'],
        multiplier: {
          original: 1,
          target: getIngredientMultiplierValue({
            multiplier: ingredientMultiplier,
            ingredientId: rate.id,
          }),
        },
      }),
    ])),
  };
};
