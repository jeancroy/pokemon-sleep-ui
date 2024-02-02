import React from 'react';

import EyeIcon from '@heroicons/react/24/solid/EyeIcon';

import {FilterTextInput} from '@/components/input/filter/preset/text';
import {getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex/common';
import {MealTypeInput} from '@/components/shared/input/mealType';
import {MealCoverageComboEntry} from '@/components/shared/meal/coverage/combo/entry';
import {
  MealCoverageComboData,
  MealCoverageComboCommonProps,
  MealCoverageComboInput,
} from '@/components/shared/meal/coverage/combo/type';
import {getMealCoverageComboData} from '@/components/shared/meal/coverage/combo/utils';
import {usePossibleMealTypes} from '@/hooks/meal';
import {isNotNullish} from '@/utils/type';


export const MealCoverageCombo = (props: MealCoverageComboCommonProps) => {
  const {mealMap} = props;

  const mealTypes = usePossibleMealTypes(Object.values(mealMap).filter(isNotNullish));
  const [filter, setFilter] = React.useState<MealCoverageComboInput>({
    mealType: mealTypes[0],
    resultCount: 15,
  });

  const data: MealCoverageComboData[] = getMealCoverageComboData({
    filter,
    ...props,
  });

  return (
    <Flex className="gap-1 pr-1">
      <MealTypeInput
        mealTypes={mealTypes}
        {...getSingleSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'mealType',
          allowNull: false,
        })}
      />
      <FilterTextInput
        title={
          <Flex center>
            <EyeIcon className="size-6"/>
          </Flex>
        }
        ids={[15, 25, 50, 100] as const}
        idToText={(count) => count.toString()}
        {...getSingleSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'resultCount',
          allowNull: false,
        })}
      />
      {data.map((entry) => (
        <MealCoverageComboEntry
          key={entry.meals.map(({id}) => id).join('-')}
          data={entry}
        />
      ))}
    </Flex>
  );
};
