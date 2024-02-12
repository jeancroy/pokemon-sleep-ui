import React from 'react';

import {useTranslations} from 'next-intl';

import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {InfoSlider} from '@/components/shared/input/infoSlider';
import {MealCommonProps} from '@/ui/meal/page/type';
import {formatMealStrengthInfo} from '@/utils/game/meal/format';
import {getMaxRecipeLevel} from '@/utils/game/meal/recipeLevel';
import {getMealFinalStrength} from '@/utils/game/meal/strength/final/recipe';


export const MealExp = ({recipeLevelData, meal, ingredientMap, translatedSettings}: MealCommonProps) => {
  const {mapMultiplier, strengthMultiplier} = translatedSettings.calculatedSettings.bonus;
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
      <ColoredEnergyIcon dimension="size-4" alt={t('Energy')}/>
      <div className="text-sm">
        {formatMealStrengthInfo({info, includeBonusRate: true})}
      </div>
    </InfoSlider>
  );
};
