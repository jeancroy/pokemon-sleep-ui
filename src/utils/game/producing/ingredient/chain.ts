import {
  IngredientChain,
  ingredientLevels,
  IngredientProduction,
  IngredientProductionAtLevels,
} from '@/types/game/pokemon/ingredient';
import {cartesianIterator} from '@/utils/compute/cartesian';
import {getEffectiveIngredientLevels} from '@/utils/game/ingredient/level';
import {isNotNullish} from '@/utils/type';


export type GeneratePossibleIngredientProductionsOpts = {
  level: number,
  chain: IngredientChain,
};

export const generatePossibleIngredientProductions = ({
  level,
  chain,
}: GeneratePossibleIngredientProductionsOpts): Generator<IngredientProduction[]> => (
  cartesianIterator(getEffectiveIngredientLevels(level).map((level) => chain.ingredients[level]))
);

export function* generatePossibleIngredientProductionAtLevels({
  level,
  chain,
}: GeneratePossibleIngredientProductionsOpts): Generator<IngredientProductionAtLevels> {
  for (const cartesianIteratorElement of cartesianIterator(getEffectiveIngredientLevels(level).map((level) => (
    chain.ingredients[level].map((production) => ({level, production}))
  )))) {
    yield Object.fromEntries(
      cartesianIteratorElement.map(({level, production}) => [level, production]),
    ) as IngredientProductionAtLevels;
  }
}

export const generateDefaultIngredientProductionAtLevels = (chain: IngredientChain): IngredientProductionAtLevels => {
  return Object.fromEntries(ingredientLevels
    .map((ingredientLevel) => {
      const production = chain.ingredients[ingredientLevel].at(0);

      if (!production) {
        return null;
      }

      return [ingredientLevel, production];
    })
    .filter(isNotNullish));
};
