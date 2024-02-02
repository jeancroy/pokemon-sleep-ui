import React from 'react';

import Bars3BottomLeftIcon from '@heroicons/react/24/solid/Bars3BottomLeftIcon';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import {useSession} from 'next-auth/react';
import {useTranslations} from 'next-intl';

import {useFilterPremiumRestrictable} from '@/components/input/filter/common/premium/hook';
import {FilterTextInput} from '@/components/input/filter/preset/text';
import {getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex/common';
import {MealTypeInput} from '@/components/shared/input/mealType';
import {mealCoverageComboSortI18nId} from '@/components/shared/meal/coverage/combo/const';
import {MealCoverageComboEntry} from '@/components/shared/meal/coverage/combo/entry';
import {
  MealCoverageComboCommonProps,
  MealCoverageComboData,
  MealCoverageComboInput,
  mealCoverageComboSort,
} from '@/components/shared/meal/coverage/combo/type';
import {getMealCoverageComboData} from '@/components/shared/meal/coverage/combo/utils';
import {PremiumIcon} from '@/components/static/premium/icon';
import {usePossibleMealTypes} from '@/hooks/meal';
import {isNotNullish} from '@/utils/type';


export const MealCoverageCombo = (props: MealCoverageComboCommonProps) => {
  const {mealMap} = props;

  const t = useTranslations('UI.Component.MealCoverageCombo');
  const mealTypes = usePossibleMealTypes(Object.values(mealMap).filter(isNotNullish));
  const [filter, setFilter] = React.useState<MealCoverageComboInput>({
    mealType: mealTypes[0],
    sort: 'ingredientCoverage',
    resultCount: 15,
  });
  const {data: session} = useSession();
  const {isInputChangeRestricted, isPremium} = useFilterPremiumRestrictable({
    premiumOnly: true,
    session,
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
          <Flex direction="row" noFullWidth center className="gap-1.5">
            {!isPremium && <PremiumIcon/>}
            <Bars3BottomLeftIcon className="size-6"/>
          </Flex>
        }
        ids={[...mealCoverageComboSort]}
        idToText={(sort) => t(mealCoverageComboSortI18nId[sort])}
        {...getSingleSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'sort',
          allowNull: false,
          isAllowed: () => !isInputChangeRestricted(),
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
