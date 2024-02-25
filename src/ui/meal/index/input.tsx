import React from 'react';

import Bars3BottomLeftIcon from '@heroicons/react/24/solid/Bars3BottomLeftIcon';
import {useTranslations} from 'next-intl';

import {FilterExpandedInput} from '@/components/input/filter/expanded/main';
import {FilterWithUpdaterProps} from '@/components/input/filter/type';
import {getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex/common';
import {GenericIcon} from '@/components/shared/icon/common/main';
import {MealFilter} from '@/components/shared/meal/filter/main';
import {textFilterButtonStyle} from '@/styles/input';
import {IngredientMap} from '@/types/game/ingredient';
import {Meal} from '@/types/game/meal/main';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {mealIndexSortingBasisI18nId, mealIndexSortingBasisIconSrc} from '@/ui/meal/index/const';
import {MealIndexFilter, mealIndexSortingBasis} from '@/ui/meal/index/type';
import {getMaxRecipeLevel} from '@/utils/game/meal/recipeLevel';


type Props = FilterWithUpdaterProps<MealIndexFilter> & {
  ingredientMap: IngredientMap,
  meals: Meal[],
  recipeLevelData: RecipeLevelData[],
};

export const MealIndexInput = ({filter, setFilter, ingredientMap, meals, recipeLevelData}: Props) => {
  const t = useTranslations('UI.InPage.Cooking.Sort');

  return (
    <>
      <MealFilter
        filter={filter}
        setFilter={setFilter}
        ingredientMap={ingredientMap}
        meals={meals}
        maxRecipeLevel={getMaxRecipeLevel({recipeLevelData})}
      />
      <FilterExpandedInput
        title={
          <Flex center>
            <Bars3BottomLeftIcon className="size-6"/>
          </Flex>
        }
        ids={[...mealIndexSortingBasis]}
        idToButton={(sort) => {
          const text = t(mealIndexSortingBasisI18nId[sort]);

          return (
            <Flex direction="row" noFullWidth className="items-center gap-0.5">
              <GenericIcon alt={text} src={mealIndexSortingBasisIconSrc[sort]} isActive={sort === filter.sort}/>
              <span>{text}</span>
            </Flex>
          );
        }}
        className={textFilterButtonStyle}
        {...getSingleSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'sort',
          allowNull: false,
        })}
      />
    </>
  );
};
