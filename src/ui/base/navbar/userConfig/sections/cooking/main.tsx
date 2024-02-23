import React from 'react';

import LockOpenIcon from '@heroicons/react/24/outline/LockOpenIcon';
import {useTranslations} from 'next-intl';

import {FilterIconInput} from '@/components/input/filter/preset/icon';
import {Flex} from '@/components/layout/flex/common';
import {GenericIngredientIcon} from '@/components/shared/icon/ingredient';
import {MealTypeInput} from '@/components/shared/input/mealType';
import {PotCapacityInput} from '@/components/shared/input/potCapacity';
import {MealPlanner} from '@/components/shared/meal/planner/main';
import {usePossibleMealTypes} from '@/hooks/meal/mealTypes';
import {UserConfigSection} from '@/ui/base/navbar/userConfig/sections/base';
import {UserConfigCookingCommonProps} from '@/ui/base/navbar/userConfig/sections/cooking/type';
import {getMaxRecipeLevel} from '@/utils/game/meal/recipeLevel';
import {isNotNullish} from '@/utils/type';


export const UserConfigCooking = (props: UserConfigCookingCommonProps) => {
  const {
    mealMap,
    recipeLevelData,
    ingredientIds,
    cookingConfig,
    setCookingConfig,
  } = props;
  const maxRecipeLevel = getMaxRecipeLevel({recipeLevelData});
  const {unlockedIngredients} = cookingConfig;

  const mealTypes = usePossibleMealTypes(Object.values(mealMap).filter(isNotNullish));
  const t = useTranslations('UI.UserConfig');
  const t2 = useTranslations('Game');

  return (
    <UserConfigSection
      titleIcon={<GenericIngredientIcon alt={t('Cooking.Title')} dimension="size-7"/>}
      title={t('Section.Cooking')}
    >
      <PotCapacityInput
        isActive={(potCapacity) => potCapacity === cookingConfig.potCapacity}
        onClick={(potCapacity) => setCookingConfig({potCapacity})}
      />
      <MealTypeInput
        mealTypes={mealTypes}
        filter={cookingConfig}
        setFilter={(getUpdated) => setCookingConfig(getUpdated(cookingConfig))}
        filterKey="mealType"
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
        onClick={(id) => setCookingConfig({unlockedIngredients: {[id]: !unlockedIngredients[id]}})}
      />
      <MealPlanner
        mealMap={mealMap}
        mealTypes={mealTypes}
        maxRecipeLevel={maxRecipeLevel}
        target={cookingConfig.target}
        setTarget={(target) => setCookingConfig({target})}
        recipeLevel={cookingConfig.recipeLevel}
        setRecipeLevel={(recipeLevel) => setCookingConfig({recipeLevel})}
      />
    </UserConfigSection>
  );
};
