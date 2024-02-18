import {productionMultiplierByPeriod} from '@/const/game/production/multiplier';
import {ProductionPeriod} from '@/types/game/producing/display';
import {ProducingRate, ProducingRateOfStates} from '@/types/game/producing/rate';
import {ProducingStateOfRate} from '@/types/game/producing/state';


type GetProducingRateOfStateOpts = {
  rate: ProducingRateOfStates,
  state: ProducingStateOfRate,
};

export const toProducingRateOfState = ({rate, state}: GetProducingRateOfStateOpts): ProducingRate => {
  const {period, energy, quantity} = rate;

  return {
    period,
    energy: energy[state],
    quantity: quantity[state],
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

  const {quantity, energy} = rate;

  const multiplier = productionMultiplierByPeriod[period] / productionMultiplierByPeriod[rate.period];

  return {
    period,
    quantity: quantity * multiplier,
    energy: energy * multiplier,
  };
};
