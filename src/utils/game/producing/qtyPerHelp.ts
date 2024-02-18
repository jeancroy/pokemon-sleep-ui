import {ProducingRateOfBranchByState} from '@/types/game/producing/rate';
import {ProduceSplit} from '@/types/game/producing/split';
import {toSum} from '@/utils/array';


type GetExpectedQtyPerHelpOpts = {
  rate: {
    berry: ProducingRateOfBranchByState,
    ingredient: ProducingRateOfBranchByState[],
  },
  produceSplit: ProduceSplit,
};

export const getExpectedQtyPerHelp = ({
  rate,
  produceSplit,
}: GetExpectedQtyPerHelpOpts): number => {
  const {berry, ingredient} = rate;

  const berryQtyPerHelp = berry.rateBase.qtyPerHelp * produceSplit.berry;
  const ingredientDailyBaseQty = (
    toSum(ingredient.map(({rateBase}) => rateBase.qtyPerHelp)) * produceSplit.ingredient
  );

  return berryQtyPerHelp + ingredientDailyBaseQty;
};
