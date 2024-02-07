import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {CollapsibleFull} from '@/components/layout/collapsible/full';
import {useCollapsibleControl} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {MealImage} from '@/components/shared/meal/image';
import {mealTypeBorderStyle, mealTypeDotStyle, mealTypeTextStyle} from '@/styles/game/mealType';
import {MealTypeId} from '@/types/game/meal/main';
import {MealPreparerIngredientStatsUI} from '@/ui/cooking/prepare/common/stats';
import {MealPreparerInfoOfMealType} from '@/ui/cooking/prepare/hook/type';
import {MealPreparerRecipe} from '@/ui/cooking/prepare/mealType/recipe';
import {MealPreparerMealTypeSummaryUI} from '@/ui/cooking/prepare/mealType/summary';
import {MealPreparerCommonProps} from '@/ui/cooking/prepare/type';


type Props = MealPreparerCommonProps & {
  mealType: MealTypeId,
  info: MealPreparerInfoOfMealType,
};

export const MealPrepareOfMealType = ({mealType, info, ...props}: Props) => {
  const {filter} = props;
  const {mealsOfType} = info;

  const t = useTranslations('Game.MealType');

  const collapsible = useCollapsibleControl(true);

  return (
    <Flex className={clsx('info-section gap-2 border', mealTypeBorderStyle[mealType])}>
      <CollapsibleFull control={collapsible} button={
        <Flex>
          <Flex direction="row" center className="gap-1 text-xl">
            <div className={clsx('size-5 rounded-full', mealTypeDotStyle[mealType])}/>
            <div className={mealTypeTextStyle[mealType]}>{t(mealType.toString())}</div>
          </Flex>
          <Flex direction="row" center className="gap-1.5">
            {mealsOfType.map(({id}) => {
              const count = filter.mealsWanted[id];

              if (!count) {
                return null;
              }

              return (
                <React.Fragment key={id}>
                  <MealImage mealId={id} dimension="size-6"/>
                  <div>{count}</div>
                </React.Fragment>
              );
            })}
          </Flex>
        </Flex>
      }>
        <Grid className={clsx(
          'grid-cols-1 gap-1 rounded-lg p-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5',
        )}>
          {mealsOfType.map((meal) => <MealPreparerRecipe key={meal.id} meal={meal} info={info} {...props}/>)}
        </Grid>
      </CollapsibleFull>
      <HorizontalSplitter className={mealTypeBorderStyle[mealType]}/>
      <MealPreparerIngredientStatsUI stats={info.ingredients}/>
      <MealPreparerMealTypeSummaryUI stats={info.summary}/>
    </Flex>
  );
};
