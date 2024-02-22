import {IngredientMultiplier} from '@/types/game/producing/multiplier';
import {PokemonProducingRateFirstPass} from '@/types/game/producing/rate/main';
import {applyMultiplierToRateOfStates} from '@/utils/game/producing/apply/multiplier';
import {getIngredientMultiplierValue} from '@/utils/game/producing/ingredient/multiplier';


type ApplyIngredientMultiplierOpts<TProduction extends PokemonProducingRateFirstPass> = {
  rate: TProduction,
  ingredientMultiplier: IngredientMultiplier,
};

export const applyIngredientMultiplier = <TProduction extends PokemonProducingRateFirstPass>({
  rate,
  ingredientMultiplier,
}: ApplyIngredientMultiplierOpts<TProduction>): TProduction => {
  const {baseRates} = rate;

  return {
    ...rate,
    baseRates: {
      ...baseRates,
      ingredient: baseRates.ingredient.map(({strengthPerHelp, ...rateOfDrop}) => ({
        ...rateOfDrop,
        strengthPerHelp: strengthPerHelp * getIngredientMultiplierValue({
          multiplier: ingredientMultiplier,
          ingredientId: rateOfDrop.id,
        }),
      })),
    },
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
