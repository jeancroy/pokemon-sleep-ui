import recipeLevel from '@/data/recipeLevel.json';
import {RecipeLevelData} from '@/types/game/meal/level';


export const recipeLevelData: RecipeLevelData[] = recipeLevel;

export const maxRecipeLevel = Math.max(...recipeLevel.map(({level}) => level));
