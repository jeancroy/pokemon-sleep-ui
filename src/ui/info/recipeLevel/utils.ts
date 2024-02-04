import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {RecipeLevelDataToShow, RecipeLevelInfoInput} from '@/ui/info/recipeLevel/type';


type GetRecipeLevelDataToShowOpts = {
  input: RecipeLevelInfoInput,
  recipeLevelData: RecipeLevelData[],
};

export const getRecipeLevelDataToShow = ({
  input,
  recipeLevelData,
}: GetRecipeLevelDataToShowOpts): RecipeLevelDataToShow[] => {
  const {currentLevel} = input;

  const current = recipeLevelData.find(({level}) => level === currentLevel);

  if (!current) {
    return recipeLevelData.map((entry) => ({
      ...entry,
      totalRequired: entry.accumulated,
    }));
  }

  return recipeLevelData
    .filter(({level}) => level >= currentLevel)
    .map((entry): RecipeLevelDataToShow => ({
      ...entry,
      totalRequired: entry.accumulated - current.accumulated,
    }));
};
