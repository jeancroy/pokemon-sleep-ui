import {IngredientId} from '@/types/game/ingredient';
import {PokemonProductionInitial} from '@/types/game/producing/rate/main';
import {applyMultiplierToRateOfStates} from '@/utils/game/producing/apply/common';


type ApplyMultiplierOnIngredientStrengthOpts<TProduction extends PokemonProductionInitial> = {
  rate: TProduction,
  getMultiplier: (id: IngredientId) => number,
};

export const applyMultiplierOnIngredientStrength = <TProduction extends PokemonProductionInitial>({
  rate,
  getMultiplier,
}: ApplyMultiplierOnIngredientStrengthOpts<TProduction>): TProduction => {
  const {baseRates} = rate;

  return {
    ...rate,
    baseRates: {
      ...baseRates,
      ingredient: baseRates.ingredient.map(({strengthPerHelp, ...rateOfDrop}) => ({
        ...rateOfDrop,
        strengthPerHelp: strengthPerHelp * getMultiplier(rateOfDrop.id),
      })),
    },
    ingredient: Object.fromEntries(Object.values(rate.ingredient).map((rate) => [
      rate.id,
      applyMultiplierToRateOfStates({
        rate,
        target: ['strength'],
        multiplier: {original: 1, target: getMultiplier(rate.id)},
      }),
    ])),
  };
};
