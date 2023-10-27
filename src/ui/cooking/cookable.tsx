import React from 'react';

import {useTranslations} from 'next-intl';

import {InfoIcon} from '@/components/icons/info';
import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {Flex} from '@/components/layout/flex/common';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {IngredientIcons} from '@/components/shared/meal/ingredients/icons';
import {IngredientIconsFromMeal} from '@/components/shared/meal/ingredients/iconsFromMeal';
import {IngredientId} from '@/types/game/ingredient';
import {PokemonProducingItem} from '@/types/game/pokemon/producing';
import {CookingRecipeLayout} from '@/ui/cooking/recipeLayout';
import {CookingFilterIngredientCount, CookingRecipeData} from '@/ui/cooking/type';
import {getMealIngredientCount} from '@/utils/game/meal/count';
import {formatInt} from '@/utils/number';


type Props = CookingRecipeData & {
  ingredientCount: CookingFilterIngredientCount,
  showUnmakeableRecipe: boolean,
};

export const CookingCookable = ({meal, info, ingredientCount, showUnmakeableRecipe}: Props) => {
  const t = useTranslations('UI.InPage.Cooking');

  const ingredientSetReady = Object.fromEntries(meal.ingredients.map(({id, quantity}) => {
    const filterIngredientCount = ingredientCount[id];

    if (filterIngredientCount == null) {
      return [id, 0];
    }

    return [id, filterIngredientCount / quantity];
  }));
  const ingredientsMissing = meal.ingredients
    .map(({id, quantity}): PokemonProducingItem<IngredientId> => {
      const filterIngredientCount = ingredientCount[id];

      if (filterIngredientCount == null) {
        return {id, qty: 0};
      }

      return {id, qty: filterIngredientCount - quantity};
    })
    .filter(({qty}) => qty < 0);

  const isMealMakeable = Object.values(ingredientSetReady).every((set) => set >= 1);

  const mealsReady = Math.min(...(meal.ingredients.length ? Object.values(ingredientSetReady) : [0]));

  return (
    <AnimatedCollapseQuick show={showUnmakeableRecipe || isMealMakeable}>
      <CookingRecipeLayout
        mealId={meal.id}
        imageDimension="h-24 w-24"
        clickable
        markGray={!isMealMakeable}
        icon={mealsReady >= 2 && <InfoIcon>{Math.floor(mealsReady)}</InfoIcon>}
      >
        <Flex noFullWidth className="absolute bottom-1 left-1 z-10 gap-1">
          <Flex direction="row" className="items-end gap-0.5">
            <InfoIcon>
              {getMealIngredientCount(meal)}
            </InfoIcon>
            <Flex noFullWidth>
              <IngredientIcons ingredients={ingredientsMissing} markRed={() => true} useTextShadow={false}/>
              <IngredientIconsFromMeal
                meal={meal} useTextShadow={false}
                markRed={(ingredient) => ingredientSetReady[ingredient.id] < 1}
              />
            </Flex>
          </Flex>
          <Flex direction="row" noFullWidth className="items-center gap-1">
            <ColoredEnergyIcon dimension="h-4 w-4" alt={t('Energy')}/>
            <div>
              {formatInt(info.strengthFinal)}
            </div>
          </Flex>
        </Flex>
        <div className="absolute bottom-1 right-1 z-10 text-sm">
          +{(info.bonusRate * 100 - 100).toFixed(1)}%
        </div>
      </CookingRecipeLayout>
    </AnimatedCollapseQuick>
  );
};
