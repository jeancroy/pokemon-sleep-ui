import {RecipeLevelData} from '@/types/game/meal/recipeLevel';


type getMaxRecipeLevelOpts = {
  recipeLevelData: RecipeLevelData[],
};

export const getMaxRecipeLevel = ({recipeLevelData}: getMaxRecipeLevelOpts) => {
  return Math.max(...recipeLevelData.map(({level}) => level));
};
