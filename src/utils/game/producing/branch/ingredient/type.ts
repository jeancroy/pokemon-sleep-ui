import {IngredientMap} from '@/types/game/ingredient';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {ProductionCommonParams} from '@/types/game/producing/rate/params';


export type GetIngredientProductionBaseListOpts = ProductionCommonParams & {
  ingredients: IngredientProduction[],
  ingredientMap: IngredientMap,
};
