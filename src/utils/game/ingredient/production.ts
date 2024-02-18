import {IngredientProduction, IngredientProductionAtLevels} from '@/types/game/pokemon/ingredient';
import {getEffectiveIngredientLevels} from '@/utils/game/ingredient/level';


type GetEffectiveIngredientProductionsOpts = {
  level: number,
  ingredients: IngredientProductionAtLevels,
};

export const getEffectiveIngredientProductions = ({
  level,
  ingredients,
}: GetEffectiveIngredientProductionsOpts): IngredientProduction[] => (
  getEffectiveIngredientLevels(level).map((level) => ingredients[level])
);
