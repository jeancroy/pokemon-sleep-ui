import {productionMultiplierByPeriod} from '@/const/game/production/multiplier';
import {ProductionPeriod} from '@/types/game/producing/display';
import {ProducingRate, ProducingRateByCalculatedStates} from '@/types/game/producing/rate';
import {ProducingStateCalculated} from '@/types/game/producing/state';


type GetProducingRateOfStateOpts = {
  rate: ProducingRateByCalculatedStates,
  state: ProducingStateCalculated,
};

export const toProducingRateOfState = ({rate, state}: GetProducingRateOfStateOpts): ProducingRate => {
  const {period, strength, qty} = rate;

  return {
    period,
    strength: strength[state],
    qty: qty[state],
  };
};

type ToProducingRateOfPeriodOpts = {
  rate: ProducingRate,
  period: ProductionPeriod,
};

export const toProducingRateOfPeriod = ({rate, period}: ToProducingRateOfPeriodOpts): ProducingRate => {
  if (rate.period === period) {
    return rate;
  }

  const {qty, strength} = rate;

  const multiplier = productionMultiplierByPeriod[period] / productionMultiplierByPeriod[rate.period];

  return {
    period,
    qty: qty * multiplier,
    strength: strength * multiplier,
  };
};
