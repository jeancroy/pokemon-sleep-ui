import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {MealImage} from '@/components/shared/meal/image';
import {CookingInputRecipeLevel} from '@/ui/cooking/common/input/level';
import {useRecipeInfo} from '@/ui/cooking/make/recipe/hook';
import {MealMakerRecipeIngredients} from '@/ui/cooking/make/recipe/parts/ingredients';
import {MealMakerRecipeStats} from '@/ui/cooking/make/recipe/parts/stats';
import {MealMakerRecipeTitle} from '@/ui/cooking/make/recipe/parts/title';
import {MealMakerRecipePartsProps} from '@/ui/cooking/make/recipe/parts/type';
import {MealMakerPopup} from '@/ui/cooking/make/recipe/popup/main';
import {MealMakerRecipeSingleProps} from '@/ui/cooking/make/recipe/type';


export const MealMakerRecipeSingle = (props: MealMakerRecipeSingleProps) => {
  const {
    meal,
    filter,
    showUnmakeableRecipe,
  } = props;
  const {id} = meal;

  const [show, setShow] = React.useState(false);
  const t = useTranslations('Game.Food');
  const recipeInfo = useRecipeInfo({
    meal,
    inventory: filter.inventory,
  });

  const {isMealMakeable} = recipeInfo;
  const mealName = t(id.toString());

  const partsProps: MealMakerRecipePartsProps = {
    ...props,
    ...recipeInfo,
    mealName,
  };

  return (
    <AnimatedCollapseQuick show={showUnmakeableRecipe || isMealMakeable} className="p-[1px]">
      <MealMakerPopup {...props} show={show} setShow={setShow}/>
      <Flex className={clsx(
        'info-section-bg transform-smooth gap-1 rounded-lg p-2',
        filter.mealsMarked[meal.id] && 'ring-1 ring-slate-900/70 dark:ring-slate-400/60',
      )}>
        <MealMakerRecipeTitle {...partsProps}/>
        <CookingInputRecipeLevel className="self-end" {...partsProps}/>
        <FlexButton direction="col" noFullWidth={false} onClick={() => setShow(true)} className={clsx(
          'button-clickable-bg group relative h-full',
        )}>
          <Flex className="z-10 gap-1 p-1">
            <MealMakerRecipeIngredients {...partsProps}/>
            <MealMakerRecipeStats {...partsProps}/>
          </Flex>
          <MealImage
            mealId={id}
            dimension="size-20"
            className="bottom-0 right-0 opacity-30"
            isAbsolute
          />
        </FlexButton>
      </Flex>
    </AnimatedCollapseQuick>
  );
};
