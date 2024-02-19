import {IngredientCounter} from '@/types/game/ingredient';
import {GroupedProducingRate, PokemonProducingRate} from '@/types/game/producing/rate';
import {ProducingStateCalculated} from '@/types/game/producing/state';
import {toProducingRateOfState} from '@/utils/game/producing/convert';
import {isNotNullish} from '@/utils/type';


export const toIngredientProductionCounterFromGroupedRate = (grouped: GroupedProducingRate<number>) => {
  return Object.fromEntries(
    Object.entries(grouped)
      .map(([id, rate]) => [
        id,
        rate?.qty,
      ])
      .filter(isNotNullish),
  );
};

type ToIngredientProductionCounterFromPokemonRateOpts = {
  pokemonRate: PokemonProducingRate,
  state: ProducingStateCalculated,
};

export const toIngredientProductionCounterFromPokemonRate = ({
  pokemonRate,
  state,
}: ToIngredientProductionCounterFromPokemonRateOpts): IngredientCounter => {
  return Object.fromEntries(Object.entries(pokemonRate.ingredient).map(([id, rate]) => [
    id,
    toProducingRateOfState({rate, state}).qty,
  ]));
};
