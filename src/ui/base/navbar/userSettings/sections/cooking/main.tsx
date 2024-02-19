import React from 'react';

import LockOpenIcon from '@heroicons/react/24/outline/LockOpenIcon';
import {useTranslations} from 'next-intl';

import {FilterIconInput} from '@/components/input/filter/preset/icon';
import {Flex} from '@/components/layout/flex/common';
import {GenericIngredientIcon} from '@/components/shared/icon/ingredient';
import {MealTypeInput} from '@/components/shared/input/mealType';
import {PotCapacityInput} from '@/components/shared/input/potCapacity';
import {MealPlanner} from '@/components/shared/meal/planner/main';
import {usePossibleMealTypes} from '@/hooks/meal';
import {UserSettingsSection} from '@/ui/base/navbar/userSettings/sections/base';
import {UserSettingsCookingCommonProps} from '@/ui/base/navbar/userSettings/sections/cooking/type';
import {getMaxRecipeLevel} from '@/utils/game/meal/recipeLevel';
import {isNotNullish} from '@/utils/type';


export const UserSettingsCooking = (props: UserSettingsCookingCommonProps) => {
  const {
    mealMap,
    recipeLevelData,
    ingredientIds,
    cookingSettings,
    setCookingSettings,
  } = props;
  const maxRecipeLevel = getMaxRecipeLevel({recipeLevelData});
  const {unlockedIngredients} = cookingSettings;

  const mealTypes = usePossibleMealTypes(Object.values(mealMap).filter(isNotNullish));
  const t = useTranslations('UI.UserConfig');
  const t2 = useTranslations('Game');

  return (
    <UserSettingsSection
      titleIcon={<GenericIngredientIcon alt={t('Cooking.Title')} dimension="size-7"/>}
      title={t('Section.Cooking')}
    >
      <PotCapacityInput
        isActive={(potCapacity) => potCapacity === cookingSettings.potCapacity}
        onClick={(potCapacity) => setCookingSettings({potCapacity})}
      />
      <MealTypeInput
        mealTypes={mealTypes}
        isActive={(mealType) => mealType === cookingSettings.mealType}
        onClick={(mealType) => setCookingSettings({mealType})}
      />
      <FilterIconInput
        idToAlt={(id) => t2(`Food.${id}`)}
        idToImageSrc={(id) => `/images/ingredient/${id}.png`}
        ids={ingredientIds}
        title={
          <Flex center>
            <LockOpenIcon className="size-5"/>
          </Flex>
        }
        isActive={(id) => !!unlockedIngredients[id]}
        onClick={(id) => setCookingSettings({unlockedIngredients: {[id]: !unlockedIngredients[id]}})}
      />
      <MealPlanner
        mealMap={mealMap}
        mealTypes={mealTypes}
        maxRecipeLevel={maxRecipeLevel}
        target={cookingSettings.target}
        setTarget={(target) => setCookingSettings({target})}
        recipeLevel={cookingSettings.recipeLevel}
        setRecipeLevel={(recipeLevel) => setCookingSettings({recipeLevel})}
      />
    </UserSettingsSection>
  );
};
