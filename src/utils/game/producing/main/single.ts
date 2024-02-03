import {PokemonProducingRateWithPayload} from '@/types/game/producing/rate';
import {CookingUserSettings} from '@/types/userData/settings';
import {getPokemonProducingRateMulti} from '@/utils/game/producing/main/multi';
import {GetPokemonProducingRateOpts} from '@/utils/game/producing/main/type';
import {GetProducingRateSharedOpts} from '@/utils/game/producing/type';


export type GetPokemonProducingRateSingleOpts =
  GetPokemonProducingRateOpts &
  GetProducingRateSharedOpts & {
    cookingSettings: CookingUserSettings,
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
