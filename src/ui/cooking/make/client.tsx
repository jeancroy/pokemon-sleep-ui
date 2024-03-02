'use client';
import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {useMealInputFilterLevelAgnostic} from '@/components/shared/meal/filter/levelAgnostic/hook';
import {generateEmptyMealFilterLevelGnostic} from '@/components/shared/meal/filter/levelGnostic/utils';
import {defaultCookingConfig} from '@/const/user/config/cooking';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {usePossibleMealTypes} from '@/hooks/meal/mealTypes';
import {useUserDataActor} from '@/hooks/userData/actor/main';
import {useCalculatedConfigBundle} from '@/hooks/userData/config/bundle/calculated';
import {generateCookingCommonFilter} from '@/ui/cooking/common/utils/main';
import {MealMakerInputUI} from '@/ui/cooking/make/input/main';
import {MealMakerRecipe} from '@/ui/cooking/make/recipe/main';
import {MealMakerCommonProps, MealMakerFilter} from '@/ui/cooking/make/type';
import {toCookingConfigFromMealMakerFilter} from '@/ui/cooking/make/utils';
import {subtractIngredientCount} from '@/utils/game/ingredient/counter';
import {isNotNullish} from '@/utils/type';


export const MealMakerClient = () => {
  const serverData = useCommonServerData();
  const {
    ingredientMap,
    mealMap,
    potInfoList,
    recipeLevelData,
    serverConfigBundle,
  } = serverData;
  const meals = Object.values(mealMap).filter(isNotNullish);

  const {actAsync, session, status} = useUserDataActor();
  const calculatedConfigBundle = useCalculatedConfigBundle({
    bundle: {
      server: serverConfigBundle,
      client: session.data?.user.preloaded,
    },
    ...serverData,
  });
  const {calculatedUserConfig, bundle} = calculatedConfigBundle;
  const {
    filter,
    setFilter,
    isIncluded,
  } = useMealInputFilterLevelAgnostic<MealMakerFilter>({
    ingredientMap,
    recipeLevelData,
    meals,
    calculatedConfigBundle,
    initialFilter: ({
      ...generateEmptyMealFilterLevelGnostic(bundle.cookingConfig),
      ...generateCookingCommonFilter(bundle.cookingConfig),
      showUnmakeableRecipe: bundle.cookingConfig?.showUnmakeableRecipe ?? defaultCookingConfig.showUnmakeableRecipe,
    }),
  });

  const mealTypes = usePossibleMealTypes(meals);

  const commonProps: MealMakerCommonProps = {
    filter,
    setFilter,
    meals,
    mealTypes,
    ingredientMap,
    potInfoList,
    recipeLevelData,
    calculatedUserConfig,
    status,
    onCook: async (ingredientsUsed) => {
      setFilter((original) => ({
        ...original,
        inventory: subtractIngredientCount(filter.inventory, ingredientsUsed),
      } satisfies MealMakerFilter));

      if (!actAsync) {
        return;
      }

      await actAsync({
        action: 'upload',
        options: {
          type: 'config.cooking',
          data: toCookingConfigFromMealMakerFilter({preloaded: bundle.cookingConfig, filter}),
        },
      });
    },
    preloaded: serverData.serverConfigBundle.cookingConfig,
  };

  return (
    <Flex className="gap-1">
      <MealMakerInputUI {...commonProps}/>
      <AdsUnit hideIfNotBlocked/>
      <MealMakerRecipe isIncluded={isIncluded} {...commonProps}/>
    </Flex>
  );
};
