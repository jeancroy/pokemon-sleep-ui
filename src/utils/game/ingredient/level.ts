import {IngredientLevel, ingredientLevels} from '@/types/game/pokemon/ingredient';


export const getEffectiveIngredientLevel = (pokemonLevel: number): IngredientLevel => {
  const sortedIngredientLevels = [...ingredientLevels].sort((a, b) => b - a);

  for (const ingredientLevel of sortedIngredientLevels) {
    if (pokemonLevel >= ingredientLevel) {
      return ingredientLevel;
    }
  }

  return sortedIngredientLevels.at(-1)!;
};

export const getEffectiveIngredientLevels = (level: number | null): IngredientLevel[] => {
  if (level === null) {
    return [...ingredientLevels];
  }

  return ingredientLevels.filter((ingredientLevel) => level >= ingredientLevel);
};
