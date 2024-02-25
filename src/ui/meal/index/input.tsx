import React from 'react';

import Bars3BottomLeftIcon from '@heroicons/react/24/solid/Bars3BottomLeftIcon';
import {useTranslations} from 'next-intl';

import {FilterExpandedInput} from '@/components/input/filter/expanded/main';
import {FilterWithUpdaterProps} from '@/components/input/filter/type';
import {getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex/common';
import {GenericIcon} from '@/components/shared/icon/common/main';
import {MealFilter} from '@/components/shared/meal/filter/main';
import {MealFilterRequiredData} from '@/components/shared/meal/filter/type';
import {textFilterButtonStyle} from '@/styles/input';
import {mealIndexSortingBasisI18nId, mealIndexSortingBasisIconSrc} from '@/ui/meal/index/const';
import {MealIndexFilter, mealIndexSortingBasis} from '@/ui/meal/index/type';


type Props = FilterWithUpdaterProps<MealIndexFilter> & MealFilterRequiredData;

export const MealIndexInput = ({filter, setFilter, ...props}: Props) => {
  const t = useTranslations('UI.InPage.Cooking.Sort');

  return (
    <>
      <MealFilter
        filter={filter}
        setFilter={setFilter}
        {...props}
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
