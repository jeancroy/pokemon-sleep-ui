import React from 'react';

import LockOpenIcon from '@heroicons/react/24/outline/LockOpenIcon';
import {useTranslations} from 'next-intl';

import {FilterIconInput} from '@/components/input/filter/preset/icon';
import {Flex} from '@/components/layout/flex/common';
import {CookingConfigUiCommonProps} from '@/components/shared/cooking/config/type';
import {MealTypeInput} from '@/components/shared/input/mealType';
import {PotCapacityInput} from '@/components/shared/input/potCapacity';
import {MealPlanner} from '@/components/shared/meal/planner/main';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {usePossibleMealTypes} from '@/hooks/meal/mealTypes';
import {getMaxRecipeLevel} from '@/utils/game/meal/recipeLevel';
import {isNotNullish} from '@/utils/type';


export const CookingConfigUI = (props: CookingConfigUiCommonProps) => {
  const {
    ingredientIds,
    cookingConfig,
    setCookingConfig,
  } = props;

  const {
    mealMap,
    potInfoList,
    recipeLevelData,
  } = useCommonServerData();

  const maxRecipeLevel = getMaxRecipeLevel({recipeLevelData});
  const {unlockedIngredients} = cookingConfig;

  const mealTypes = usePossibleMealTypes(Object.values(mealMap).filter(isNotNullish));
  const t = useTranslations('Game');

  return (
    <>
      <PotCapacityInput
        potInfoList={potInfoList}
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
        idToAlt={(id) => t(`Food.${id}`)}
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
    </>
  );
};
