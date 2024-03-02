import {IngredientMultiplier} from '@/types/game/producing/multiplier';
import {PokemonProductionInitial, PokemonProductionWithPayload} from '@/types/game/producing/rate/main';
import {applyIngredientMultiplier} from '@/utils/game/producing/apply/ingredient';
import {PokemonProductionInCalcWithPayload} from '@/utils/game/producing/main/entry/components/rates/type';


type GetPokemonProductionPostIngredientMultiplierOpts<TPayload> = {
  rates: PokemonProductionInCalcWithPayload<PokemonProductionInitial, TPayload>[],
  ingredientMultiplier: IngredientMultiplier,
};

export const getPokemonProductionPostIngredientMultiplier = <TPayload>({
  rates,
  ingredientMultiplier,
}: GetPokemonProductionPostIngredientMultiplierOpts<TPayload>): PokemonProductionWithPayload<
  TPayload,
  PokemonProductionInitial
>[] => {
  return rates.map(({rate, calculatedUserConfig, payload}) => ({
    payload,
    metadata: {
      ingredientMultiplier,
      calculatedUserConfig,
    },
    atStage: {
      original: rate,
      final: applyIngredientMultiplier({rate, ingredientMultiplier}),
    },
  }));
};
