import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InfoIcon} from '@/components/icons/info';
import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {Flex} from '@/components/layout/flex/common';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PotIcon} from '@/components/shared/icon/pot';
import {IngredientIconsFromMeal} from '@/components/shared/ingredient/icons/fromMeal';
import {NumberInputOptional} from '@/components/shared/input/number/optional/main';
import {MealImage} from '@/components/shared/meal/image';
import {Meal} from '@/types/game/meal/main';
import {CookingInputRecipeLevel} from '@/ui/cooking/common/input/level';
import {CookingExternalLink} from '@/ui/cooking/common/link';
import {CookingMarkButton} from '@/ui/cooking/common/mark';
import {MealPreparerInfoOfMealType} from '@/ui/cooking/prepare/hook/type';
import {MealPreparerCommonProps, MealPreparerFilter} from '@/ui/cooking/prepare/type';
import {getMealIngredientCount} from '@/utils/game/meal/count';
import {formatInt} from '@/utils/number/format/regular';


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
  const {mealsWanted, showRecipeStrength} = filter;
  const {id} = meal;

  const t = useTranslations('UI.InPage.Cooking');
  const t2 = useTranslations('Game.Food');

  const mealName = t2(id.toString());
  const mealCount = mealsWanted[id];

  return (
    <Flex className={clsx(
      'bg-plate transform-smooth relative rounded-lg p-2',
      filter.mealsMarked[id] && 'ring-1 ring-slate-900/70 dark:ring-slate-400/60',
    )}>
      <Flex className={clsx(
        'z-10 gap-1',
        !mealCount && 'text-slate-600/90 dark:text-slate-400/90',
      )}>
        <Flex direction="row" className="justify-between gap-1">
          <Flex direction="row" className="gap-1 truncate" noFullWidth>
            <CookingMarkButton
              marked={!!filter.mealsMarked[id]}
              setMarked={(updated) => setFilter((original) => ({
                ...original,
                mealsMarked: {
                  ...original.mealsMarked,
                  [id]: updated,
                },
              }))}
            />
            <InfoIcon style="soft">
              {getMealIngredientCount(meal)}
            </InfoIcon>
            <div className="truncate text-sm">
              {mealName}
            </div>
          </Flex>
          <Flex direction="row" noFullWidth className="shrink-0 items-center gap-1">
            <IngredientIconsFromMeal meal={meal} noLink/>
            <CookingExternalLink mealId={id}/>
          </Flex>
        </Flex>
        <Flex direction="row" className="gap-1">
          <NumberInputOptional
            text={<PotIcon alt={t('TargetMealCount')} dimension="size-6"/>}
            value={mealCount}
            min={0}
            onClickDefault={1}
            setValue={(count) => setFilter((original) => ({
              ...original,
              mealsWanted: {
                ...original.mealsWanted,
                [id]: count,
              },
            } satisfies MealPreparerFilter))}
            classOfInputWidth="w-8"
          />
          <CookingInputRecipeLevel
            classOfInputWidth="w-8"
            {...props}
          />
        </Flex>
      </Flex>
      <AnimatedCollapseQuick show={showRecipeStrength}>
        <Flex direction="row" noFullWidth className="mt-1 items-center gap-1">
          <ColoredEnergyIcon alt={t('Energy')}/>
          <span>{formatInt(info.finalStrength[id])}</span>
        </Flex>
      </AnimatedCollapseQuick>
      <MealImage
        mealId={id}
        dimension="size-14"
        className="bottom-0 right-0 self-end opacity-30"
        isAbsolute
      />
    </Flex>
  );
};
