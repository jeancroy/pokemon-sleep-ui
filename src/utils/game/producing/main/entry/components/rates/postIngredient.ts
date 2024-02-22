import {PokemonProducingRateFirstPass, PokemonProducingRateWithPayload} from '@/types/game/producing/rate/main';
import {ProducingStateCalculated} from '@/types/game/producing/state';
import {applyIngredientMultiplier} from '@/utils/game/producing/apply/ingredient';
import {groupPokemonProducingRate} from '@/utils/game/producing/group';
import {
  getPokemonProducingRateIngredientMultiplier,
  GetPokemonProducingRateIngredientMultiplierOpts,
} from '@/utils/game/producing/main/entry/components/ingredientMultiplier';
import {PokemonProductionInCalcWithPayload} from '@/utils/game/producing/main/entry/components/rates/type';


type GetPokemonProductionPostIngredientMultiplierOpts<TPayload> = {
  groupingState: ProducingStateCalculated,
  rates: PokemonProductionInCalcWithPayload<PokemonProducingRateFirstPass, TPayload>[],
  ingredientMultiplierOpts: Omit<GetPokemonProducingRateIngredientMultiplierOpts, 'groupedOriginalRates'>,
};

export const getPokemonProductionPostIngredientMultiplier = <TPayload>({
  groupingState,
  rates,
  ingredientMultiplierOpts,
}: GetPokemonProductionPostIngredientMultiplierOpts<TPayload>): PokemonProducingRateWithPayload<
  TPayload,
  PokemonProducingRateFirstPass
>[] => {
  const {period} = ingredientMultiplierOpts;

  const ingredientMultiplier = getPokemonProducingRateIngredientMultiplier({
    ...ingredientMultiplierOpts,
    groupedOriginalRates: groupPokemonProducingRate({
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
