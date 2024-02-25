import React from 'react';

import {useTranslations} from 'next-intl';

import {ColoredStrengthIcon} from '@/components/shared/icon/strengthColored';
import {InfoSlider} from '@/components/shared/input/infoSlider';
import {MealCommonProps} from '@/ui/meal/page/type';
import {formatMealStrengthInfo} from '@/utils/game/meal/format';
import {getMaxRecipeLevel} from '@/utils/game/meal/recipeLevel';
import {getMealFinalStrength} from '@/utils/game/meal/strength/final/recipe';


export const MealExp = ({recipeLevelData, meal, ingredientMap, calculatedConfigBundle}: MealCommonProps) => {
  const {mapMultiplier, strengthMultiplier} = calculatedConfigBundle.calculatedUserConfig.bonus;
  const maxRecipeLevel = getMaxRecipeLevel({recipeLevelData});

  const t = useTranslations('UI.InPage.Cooking');
  const [level, setLevel] = React.useState(1);

  const info = getMealFinalStrength({
    filler: [],
    level,
    meal,
    ingredientMap,
    recipeLevelData,
    mapMultiplier,
    strengthMultiplier: strengthMultiplier.cooking,
  });

  return (
    <InfoSlider
      title={t('RecipeLevel')}
      value={level}
      setValue={setLevel}
      maxValue={maxRecipeLevel}
    >
      <ColoredStrengthIcon dimension="size-4" alt={t('Energy')}/>
      <div className="text-sm">
        {formatMealStrengthInfo({info, includeBonusRate: true})}
      </div>
    </InfoSlider>
  );
};
