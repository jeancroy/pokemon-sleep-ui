import {ProductionOfDrop} from '@/types/game/producing/rate/base';
import {ProduceSplit} from '@/types/game/producing/split';
import {toSum} from '@/utils/array';


type GetExpectedQtyPerHelpOpts = {
  rate: {
    berry: ProductionOfDrop,
    ingredient: ProductionOfDrop[],
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
    toSum(ingredient.map(({qtyPerHelp}) => qtyPerHelp / ingredient.length)) * produceSplit.ingredient
  );

  return berryQtyPerHelp + ingredientQtyPerHelp;
};
