import {ProducingParamsDisplayResult, ProducingParamsMaximum} from '@/ui/info/production/client/type';
import {isValueValidNumber} from '@/utils/number/filter';


export const getProducingParamsMaximum = (
  pokemonResult: ProducingParamsDisplayResult[],
): ProducingParamsMaximum => ({
  ingredientRate: Math.max(
    ...pokemonResult.map(({params}) => params.ingredientSplit).filter(isValueValidNumber),
  ),
  skillRate: Math.max(
    ...pokemonResult.map(({params}) => params.skillPercent).filter(isValueValidNumber),
  ),
});
