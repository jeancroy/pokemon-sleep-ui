import {PokemonProducingRate} from '@/types/game/producing/rate';
import {GetIngredientMultiplierOpts} from '@/utils/game/producing/ingredient/multiplier';
import {GetPokemonProducingRateBaseOpts} from '@/utils/game/producing/main/base';
import {getPokemonProducingRateMulti} from '@/utils/game/producing/main/multi';


type GetPokemonProducingRateSingleOpts =
  Omit<GetIngredientMultiplierOpts, 'production'> &
  GetPokemonProducingRateBaseOpts;

export const getPokemonProducingRateSingle = (
  opts: GetPokemonProducingRateSingleOpts,
): PokemonProducingRate => {
  const rates = getPokemonProducingRateMulti({
    rateOpts: [{opts, payload: null}],
    sharedOpts: opts,
    groupingState: 'equivalent',
    ...opts,
  });

  return rates.rates[0].rate.final;
};
