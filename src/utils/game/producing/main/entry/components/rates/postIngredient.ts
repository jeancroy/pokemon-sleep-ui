import {PokemonProductionInitial, PokemonProductionWithPayload} from '@/types/game/producing/rate/main';
import {ProducingStateCalculated} from '@/types/game/producing/state';
import {applyIngredientMultiplier} from '@/utils/game/producing/apply/ingredient';
import {groupPokemonProduction} from '@/utils/game/producing/group';
import {
  getPokemonProductionIngredientMultiplier,
  GetPokemonProductionIngredientMultiplierOpts,
} from '@/utils/game/producing/main/entry/components/ingredientMultiplier';
import {PokemonProductionInCalcWithPayload} from '@/utils/game/producing/main/entry/components/rates/type';


type GetPokemonProductionPostIngredientMultiplierOpts<TPayload> = {
  groupingState: ProducingStateCalculated,
  rates: PokemonProductionInCalcWithPayload<PokemonProductionInitial, TPayload>[],
  ingredientMultiplierOpts: Omit<GetPokemonProductionIngredientMultiplierOpts, 'groupedOriginalRates'>,
};

export const getPokemonProductionPostIngredientMultiplier = <TPayload>({
  groupingState,
  rates,
  ingredientMultiplierOpts,
}: GetPokemonProductionPostIngredientMultiplierOpts<TPayload>): PokemonProductionWithPayload<
  TPayload,
  PokemonProductionInitial
>[] => {
  const {period} = ingredientMultiplierOpts;

  const ingredientMultiplier = getPokemonProductionIngredientMultiplier({
    ...ingredientMultiplierOpts,
    groupedOriginalRates: groupPokemonProduction({
      period,
      rates: rates.map(({rate}) => rate),
      state: groupingState,
    }),
  });

  return rates.map(({rate, calculatedUserConfig, payload}) => ({
    payload,
    calculatedUserConfig,
    atStage: {
      original: rate,
      final: applyIngredientMultiplier({rate, ingredientMultiplier}),
    },
  }));
};
