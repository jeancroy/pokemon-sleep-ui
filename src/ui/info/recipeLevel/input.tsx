import React from 'react';

import {useTranslations} from 'next-intl';

import {NumberInputRequired} from '@/components/shared/input/number/required/main';
import {RecipeLevelInfoDataProps, RecipeLevelInfoInput} from '@/ui/info/recipeLevel/type';


type Props = RecipeLevelInfoDataProps & {
  input: RecipeLevelInfoInput,
  setInput: React.Dispatch<React.SetStateAction<RecipeLevelInfoInput>>,
};

export const RecipeLevelInfoInputUI = ({recipeLevelData, input, setInput}: Props) => {
  const t = useTranslations('UI.InPage.Info.RecipeLevel');

  return (
    <NumberInputRequired
      text={t('Input.CurrentLevel')}
      value={input.currentLevel}
      setValue={(recipeLevel) => setInput((original) => ({
        ...original,
        currentLevel: recipeLevel,
      } satisfies RecipeLevelInfoInput))}
      min={0}
      max={Math.max(...recipeLevelData.map(({level}) => level))}
      className="self-center p-1"
    />
  );
};
