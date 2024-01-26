import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InfoIcon} from '@/components/icons/info';
import {Flex} from '@/components/layout/flex/common';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PotIcon} from '@/components/shared/icon/pot';
import {NumberInputOptional} from '@/components/shared/input/number/optional/main';
import {MealImage} from '@/components/shared/meal/image';
import {IngredientIconsFromMeal} from '@/components/shared/meal/ingredients/iconsFromMeal';
import {Meal} from '@/types/game/meal/main';
import {CookingInputRecipeLevel} from '@/ui/cooking/common/input/level';
import {CookingExternalLink} from '@/ui/cooking/common/link';
import {CookingMarkButton} from '@/ui/cooking/common/mark';
import {MealPreparerInfoOfMealType} from '@/ui/cooking/prepare/hook/type';
import {MealPreparerCommonProps, MealPreparerFilter} from '@/ui/cooking/prepare/type';
import {getMealIngredientCount} from '@/utils/game/meal/count';
import {formatInt} from '@/utils/number/format';


type Props = MealPreparerCommonProps & {
  meal: Meal,
  info: MealPreparerInfoOfMealType,
};

export const MealPreparerRecipe = (props: Props) => {
  const {
    filter,
    setFilter,
    meal,
    info,
  } = props;
  const {id} = meal;

  const t = useTranslations('UI.InPage.Cooking');
  const t2 = useTranslations('Game.Food');

  const mealName = t2(id.toString());
  const count = filter.mealsWanted[id];

  return (
    <Flex className={clsx(
      'bg-plate transform-smooth relative rounded-lg p-2',
      filter.mealsMarked[meal.id] && 'ring-1 ring-slate-900/70 dark:ring-slate-400/60',
    )}>
      <Flex className={clsx(
        'z-10 gap-1.5',
        !count && 'text-slate-600/90 dark:text-slate-400/90',
      )}>
        <Flex direction="row" className="justify-between">
          <Flex direction="row" className="gap-1 truncate" noFullWidth>
            <CookingMarkButton
              marked={!!filter.mealsMarked[meal.id]}
              setMarked={(updated) => setFilter((original) => ({
                ...original,
                mealsMarked: {
                  ...original.mealsMarked,
                  [meal.id]: updated,
                },
              }))}
            />
            <div className="truncate text-sm">
              {mealName}
            </div>
          </Flex>
          <CookingExternalLink mealId={id}/>
        </Flex>
        <Flex direction="row" noFullWidth className="items-center gap-1">
          <InfoIcon style="soft">
            {getMealIngredientCount(meal)}
          </InfoIcon>
          <IngredientIconsFromMeal meal={meal}/>
        </Flex>
        <CookingInputRecipeLevel {...props}/>
        <NumberInputOptional
          text={<PotIcon alt={t('TargetMealCount')} dimension="size-6"/>}
          value={count}
          min={0}
          onClickDefault={1}
          setValue={(count) => setFilter((original) => ({
            ...original,
            mealsWanted: {
              ...original.mealsWanted,
              [id]: count,
            },
          } satisfies MealPreparerFilter))}
        />
        <Flex direction="row" noFullWidth className="items-center gap-1">
          <ColoredEnergyIcon alt={t('Energy')}/>
          <div>
            {formatInt(info.finalStrength[id])}
          </div>
        </Flex>
      </Flex>
      <MealImage
        mealId={id}
        dimension="size-20"
        className="bottom-0 right-0 self-end opacity-30"
        isAbsolute
      />
    </Flex>
  );
};
