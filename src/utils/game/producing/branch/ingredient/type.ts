import {IngredientMap} from '@/types/game/ingredient';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {ProducingRateCommonParams} from '@/types/game/producing/rate/params';


export type GetIngredientProducingRateBaseListOpts = ProducingRateCommonParams & {
  ingredients: IngredientProduction[],
  ingredientMap: IngredientMap,
};
