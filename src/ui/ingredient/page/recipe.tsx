import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {FlexLink} from '@/components/layout/flex/link';
import {IconWithInfo} from '@/components/shared/common/image/iconWithInfo';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {IngredientIconsFromMeal} from '@/components/shared/ingredient/icons/fromMeal';
import {imageGallerySizes} from '@/styles/image';
import {IngredientId, IngredientMap} from '@/types/game/ingredient';
import {MealMap} from '@/types/game/meal/main';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {getCookableMeals} from '@/utils/game/meal/cookable';
import {getMealIngredientCount} from '@/utils/game/meal/count';
import {getMaxRecipeLevel} from '@/utils/game/meal/recipeLevel';
import {getMealBaseStrength} from '@/utils/game/meal/strength/base';
import {isNotNullish} from '@/utils/type';


type Props = {
  mealMap: MealMap,
  recipeLevelData: RecipeLevelData[],
  ingredientMap: IngredientMap,
  ingredientId: IngredientId,
};

export const IngredientCookableMeals = ({mealMap, recipeLevelData, ingredientMap, ingredientId}: Props) => {
  const maxRecipeLevel = getMaxRecipeLevel({recipeLevelData});

  const t = useTranslations('Game.Food');
  const t2 = useTranslations('UI.InPage.Cooking');

  return (
    <Flex direction="row" center wrap className="info-section">
      {getCookableMeals({
        meals: Object.values(mealMap).filter(isNotNullish),
        ingredientId,
      })
        .sort((a, b) => (
          getMealBaseStrength({
            recipeLevelData,
            level: maxRecipeLevel,
            ingredientMap,
            meal: a,
          }).strengthFinal -
          getMealBaseStrength({
            recipeLevelData,
            level: maxRecipeLevel,
            ingredientMap,
            meal: b,
          }).strengthFinal
        ))
        .map((meal) => (
          <FlexLink
            href={`/meal/${meal.id}`}
            direction="col"
            key={meal.id}
            center
            className="button-clickable-bg gap-1 p-1.5"
          >
            <div className="text-sm">
              {t(meal.id.toString())}
            </div>
            <IconWithInfo
              imageSrc={`/images/meal/portrait/${meal.id}.png`}
              imageAlt={t(meal.id.toString())}
              imageDimension="size-12"
              imageSizes={imageGallerySizes}
              info={getMealIngredientCount(meal)}
            />
            <IngredientIconsFromMeal meal={meal} noLink/>
            <Flex direction="row" center className="gap-0.5">
              <ColoredEnergyIcon dimension="size-4" alt={t2('Energy')}/>
              <div className="text-sm">
                {getMealBaseStrength({
                  recipeLevelData,
                  level: maxRecipeLevel,
                  meal,
                  ingredientMap,
                }).strengthFinal}
              </div>
            </Flex>
          </FlexLink>
        ))}
    </Flex>
  );
};
