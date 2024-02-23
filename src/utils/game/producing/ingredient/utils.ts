import {IngredientCounter} from '@/types/game/ingredient';
import {GroupedProduction, PokemonProduction} from '@/types/game/producing/rate/main';
import {ProducingStateCalculated} from '@/types/game/producing/state';
import {toProductionOfState} from '@/utils/game/producing/convert';
import {isNotNullish} from '@/utils/type';


export const toIngredientProductionCounterFromGroupedRate = (grouped: GroupedProduction<number>) => {
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
  pokemonRate: PokemonProduction,
  state: ProducingStateCalculated,
};

export const toIngredientProductionCounterFromPokemonRate = ({
  pokemonRate,
  state,
}: ToIngredientProductionCounterFromPokemonRateOpts): IngredientCounter => {
  return Object.fromEntries(Object.entries(pokemonRate.ingredient).map(([id, rate]) => [
    id,
    toProductionOfState({rate, state}).qty,
  ]));
};
