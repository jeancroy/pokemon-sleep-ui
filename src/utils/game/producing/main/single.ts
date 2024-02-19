import {PokemonProducingRateWithPayload} from '@/types/game/producing/rate';
import {CalculatedCookingSettings} from '@/types/userData/settings/cooking/calculated';
import {getPokemonProducingRateMulti} from '@/utils/game/producing/main/multi';
import {GetPokemonProducingRateOpts, GetProducingRateSharedOpts} from '@/utils/game/producing/main/type';


export type GetPokemonProducingRateSingleOpts =
  GetPokemonProducingRateOpts &
  GetProducingRateSharedOpts & {
    calculatedCookingSettings: CalculatedCookingSettings,
  };

export const getPokemonProducingRateSingle = ({
  calcBehavior,
  ...opts
}: GetPokemonProducingRateSingleOpts): PokemonProducingRateWithPayload<null> => {
  const rates = getPokemonProducingRateMulti({
    rateOpts: [{opts, payload: null}],
    sharedOpts: {
      ...opts,
      calcBehavior: {
        ...calcBehavior,
        // Calculate as single by default
        asSingle: calcBehavior?.asSingle ?? true,
      },
    },
    groupingState: 'equivalent',
    ...opts,
  });

  return rates.rates[0];
};
