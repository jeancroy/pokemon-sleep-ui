import {IngredientMultiplier} from '@/types/game/producing/multiplier';
import {PokemonProductionInitial} from '@/types/game/producing/rate/main';
import {applyMultiplierOnIngredientStrength} from '@/utils/game/producing/apply/base/onIngredientStrength';
import {getIngredientMultiplierValue} from '@/utils/game/producing/ingredient/multiplier';


type ApplyIngredientMultiplierOpts<TProduction extends PokemonProductionInitial> = {
  rate: TProduction,
  ingredientMultiplier: IngredientMultiplier,
};

export const applyIngredientMultiplier = <TProduction extends PokemonProductionInitial>({
  rate,
  ingredientMultiplier,
}: ApplyIngredientMultiplierOpts<TProduction>): TProduction => {
  return applyMultiplierOnIngredientStrength({
    rate,
    getMultiplier: (ingredientId) => getIngredientMultiplierValue({
      multiplier: ingredientMultiplier,
      ingredientId,
    }),
  });
};
