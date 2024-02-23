import {productionMultiplierByPeriod} from '@/const/game/production/multiplier';
import {ProductionPeriod} from '@/types/game/producing/display';
import {Production, ProductionByCalculatedStates} from '@/types/game/producing/rate/base';
import {ProducingStateCalculated} from '@/types/game/producing/state';


type GetProductionOfStateOpts = {
  rate: ProductionByCalculatedStates,
  state: ProducingStateCalculated,
};

export const toProductionOfState = ({rate, state}: GetProductionOfStateOpts): Production => {
  const {period, strength, qty} = rate;

  return {
    period,
    strength: strength[state],
    qty: qty[state],
  };
};

type ToProductionOfPeriodOpts = {
  rate: Production,
  period: ProductionPeriod,
};

export const toProductionOfPeriod = ({rate, period}: ToProductionOfPeriodOpts): Production => {
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
