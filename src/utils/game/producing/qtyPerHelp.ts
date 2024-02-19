import {ProducingRateOfDrop} from '@/types/game/producing/rate';
import {ProduceSplit} from '@/types/game/producing/split';
import {toSum} from '@/utils/array';


type GetExpectedQtyPerHelpOpts = {
  rate: {
    berry: ProducingRateOfDrop,
    ingredient: ProducingRateOfDrop[],
  },
  produceSplit: ProduceSplit,
};

export const getExpectedQtyPerHelp = ({
  rate,
  produceSplit,
}: GetExpectedQtyPerHelpOpts): number => {
  const {berry, ingredient} = rate;

  const berryQtyPerHelp = berry.qtyPerHelp * produceSplit.berry;
  const ingredientQtyPerHelp = (
    toSum(ingredient.map(({qtyPerHelp}) => qtyPerHelp)) * produceSplit.ingredient
  );

  return berryQtyPerHelp + ingredientQtyPerHelp;
};
