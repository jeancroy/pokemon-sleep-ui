import {EffectiveBonus} from '@/types/game/bonus/main';
import {ProducingRateOfItemOfSessions} from '@/types/game/producing/rate';
import {ProduceSplit} from '@/types/game/producing/split';
import {toSum} from '@/utils/array';
import {toProducingRateOfPeriod} from '@/utils/game/producing/convert';


type GetDailyBaseQtyInSleepOfDropTypeOpts = {
  rate: ProducingRateOfItemOfSessions,
  bonus: EffectiveBonus,
  produceSplit: number,
};

const getDailyBaseQtyInSleepOfDropType = ({
  rate,
  bonus,
  produceSplit,
}: GetDailyBaseQtyInSleepOfDropTypeOpts): number => {
  const {sleep1, sleep2} = rate;
  const {multiplier} = bonus.stamina;

  return (
    produceSplit *
    (
      // Stamina multiplier divided by `Infinity` on null
      // to make the quantity 0 if the corresponding sleep session is inactive
      toProducingRateOfPeriod({rate: sleep1, period: 'daily'}).quantity / (multiplier.sleep1 ?? Infinity) +
      toProducingRateOfPeriod({rate: sleep2, period: 'daily'}).quantity / (multiplier.sleep2 ?? Infinity)
    )
  );
};

type GetDailyBaseQtyInSleepOpts = {
  rate: {
    berry: ProducingRateOfItemOfSessions,
    ingredient: ProducingRateOfItemOfSessions[],
  },
  bonus: EffectiveBonus,
  produceSplit: ProduceSplit,
};

export const getDailyBaseQtyInSleep = ({
  rate,
  bonus,
  produceSplit,
}: GetDailyBaseQtyInSleepOpts): number => {
  const {berry, ingredient} = rate;

  const berryDailyBaseQty = getDailyBaseQtyInSleepOfDropType({
    rate: berry,
    produceSplit: produceSplit.berry,
    bonus,
  });
  const ingredientDailyBaseQty = toSum(ingredient.map((rate) => getDailyBaseQtyInSleepOfDropType({
    rate,
    produceSplit: produceSplit.ingredient,
    bonus,
  })));

  return berryDailyBaseQty + ingredientDailyBaseQty;
};
