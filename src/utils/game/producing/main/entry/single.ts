import {PokemonProductionWithPayload} from '@/types/game/producing/rate/main';
import {CalculatedCookingConfig} from '@/types/userData/config/cooking/main';
import {getPokemonProductionMulti} from '@/utils/game/producing/main/entry/multi';
import {GetPokemonProductionOpts, GetPokemonProductionSharedOpts} from '@/utils/game/producing/main/type';


export type GetPokemonProductionSingleOpts = GetPokemonProductionOpts & GetPokemonProductionSharedOpts & {
  calculatedCookingConfig: CalculatedCookingConfig,
};

export const getPokemonProductionSingle = ({
  calcBehavior,
  ...opts
}: GetPokemonProductionSingleOpts): PokemonProductionWithPayload<null> => {
  const rates = getPokemonProductionMulti({
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
