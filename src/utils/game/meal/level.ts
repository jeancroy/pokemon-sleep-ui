import {RecipeLevelData} from '@/types/game/meal/recipeLevel';


type GetRecipeLevelDataAtLevelOpts = {
  recipeLevelData: RecipeLevelData[],
  level: number,
};

export const getRecipeLevelDataAtLevel = ({
  recipeLevelData,
  level,
}: GetRecipeLevelDataAtLevelOpts): RecipeLevelData | undefined => {
  return recipeLevelData.find((entry) => entry.level === level);
};
