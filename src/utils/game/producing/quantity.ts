import {ProducingRateOfItemOfSessions} from '@/types/game/producing/rate';
import {ProduceSplit} from '@/types/game/producing/split';
import {toSum} from '@/utils/array';
import {toProducingRateOfPeriod} from '@/utils/game/producing/convert';


type GetTheoreticalDailyQuantityInSleepOpts = {
  rate: {
    berry: ProducingRateOfItemOfSessions,
    ingredient: ProducingRateOfItemOfSessions[],
  },
  produceSplit: ProduceSplit,
};

export const getTheoreticalDailyQuantityInSleep = ({
  rate,
  produceSplit,
}: GetTheoreticalDailyQuantityInSleepOpts): number => {
  const {berry, ingredient} = rate;

  const berryDailyQuantity = (
    produceSplit.berry *
    (
      toProducingRateOfPeriod({rate: berry.sleep1, period: 'daily'}).quantity +
      toProducingRateOfPeriod({rate: berry.sleep2, period: 'daily'}).quantity
    )
  );
  const ingredientDailyQuantity = (
    produceSplit.ingredient *
    toSum(ingredient.map(({sleep1, sleep2}) => (
      toProducingRateOfPeriod({rate: sleep1, period: 'daily'}).quantity +
      toProducingRateOfPeriod({rate: sleep2, period: 'daily'}).quantity
    )))
  );

  return berryDailyQuantity + ingredientDailyQuantity;
};
