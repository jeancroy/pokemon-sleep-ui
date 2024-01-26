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
import {isNotNullish} from '@/utils/type';


export const UserSettingsCooking = (props: UserSettingsCookingCommonProps) => {
  const {
    cookingPreset,
    setCookingPreset,
    mealMap,
    ingredientIds,
  } = props;
  const {unlockedIngredients} = cookingPreset;

  const mealTypes = usePossibleMealTypes(Object.values(mealMap).filter(isNotNullish));
  const t = useTranslations('UI.UserSettings');
  const t2 = useTranslations('Game');

  return (
    <UserSettingsSection titleIcon={<GenericIngredientIcon alt={t('Cooking.Title')} dimension="size-10"/>}>
      <PotCapacityInput
        isActive={(potCapacity) => potCapacity === cookingPreset.potCapacity}
        onClick={(potCapacity) => setCookingPreset({potCapacity})}
      />
      <MealTypeInput
        mealTypes={mealTypes}
        isActive={(mealType) => mealType === cookingPreset.mealType}
        onClick={(mealType) => setCookingPreset({mealType})}
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
        onClick={(id) => setCookingPreset({unlockedIngredients: {[id]: !unlockedIngredients[id]}})}
      />
      <MealPlanner
        target={cookingPreset.target}
        setTarget={(target) => setCookingPreset({target})}
        recipeLevel={cookingPreset.recipeLevel}
        setRecipeLevel={(recipeLevel) => setCookingPreset({recipeLevel})}
        mealMap={mealMap}
        mealTypes={mealTypes}
      />
    </UserSettingsSection>
  );
};
