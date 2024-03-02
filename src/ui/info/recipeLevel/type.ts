import {RecipeLevelData} from '@/types/game/meal/recipeLevel';


export type RecipeLevelDataToShow = RecipeLevelData & {
  totalRequired: number,
};

export type RecipeLevelInfoInput = {
  currentLevel: number,
};
