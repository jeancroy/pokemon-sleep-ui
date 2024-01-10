import React from 'react';

import EyeIcon from '@heroicons/react/24/solid/EyeIcon';

import {FilterTextInput} from '@/components/input/filter/preset/text';
import {getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex/common';
import {MealTypeInput} from '@/components/shared/input/mealType';
import {MealCoverageTargetComboEntry} from '@/components/shared/meal/coverage/targetCombo/entry';
import {
  MealCoverageTargetComboInput,
  MealCoverageTargetComboCommonProps,
} from '@/components/shared/meal/coverage/targetCombo/type';
import {usePossibleMealTypes} from '@/hooks/meal';
import {getMealCoverage} from '@/utils/game/cooking';
import {generateTargetMeals} from '@/utils/game/meal/generate';
import {isNotNullish} from '@/utils/type';


export const MealCoverageTargetCombo = ({
  mealMap,
  ingredientProduction,
  period,
}: MealCoverageTargetComboCommonProps) => {
  const mealTypes = usePossibleMealTypes(Object.values(mealMap).filter(isNotNullish));
  const [filter, setFilter] = React.useState<MealCoverageTargetComboInput>({
    mealType: mealTypes[0],
    resultCount: 15,
  });

  const {mealType, resultCount} = filter;

  const data = [...generateTargetMeals({
    mealType,
    mealMap,
  })]
    .map((meals) => ({
      coverage: getMealCoverage({
        meals,
        ingredientProduction,
        period,
      }),
      meals,
    }))
    .sort((a, b) => (
      b.coverage.total - a.coverage.total
    ))
    .slice(0, resultCount);

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
            <EyeIcon className="h-6 w-6"/>
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
      {data.map(({coverage, meals}) => (
        <MealCoverageTargetComboEntry
          key={meals.map(({id}) => id).join('-')}
          targets={meals}
          coverage={coverage}
        />
      ))}
    </Flex>
  );
};
