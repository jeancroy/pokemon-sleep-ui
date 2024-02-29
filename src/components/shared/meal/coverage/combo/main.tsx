import React from 'react';

import Bars3BottomLeftIcon from '@heroicons/react/24/solid/Bars3BottomLeftIcon';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import {useSession} from 'next-auth/react';
import {useTranslations} from 'next-intl';

import {useFilterPremiumRestrictable} from '@/components/input/filter/common/premium/hook';
import {FilterTextInput} from '@/components/input/filter/preset/text';
import {getMultiSelectOnClickProps, getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex/common';
import {GenericIngredientSlashIcon} from '@/components/shared/icon/ingredientSlash';
import {IngredientSelectionInput} from '@/components/shared/input/ingredient/selection';
import {MealTypeInput} from '@/components/shared/input/mealType';
import {useMealCoverageComboData} from '@/components/shared/meal/coverage/combo/calc/hook';
import {mealCoverageComboSortI18nId} from '@/components/shared/meal/coverage/combo/const';
import {MealCoverageComboEntry} from '@/components/shared/meal/coverage/combo/entry';
import {
  MealCoverageComboCommonProps,
  MealCoverageComboInput,
  mealCoverageComboSort,
} from '@/components/shared/meal/coverage/combo/type';
import {PremiumIcon} from '@/components/static/premium/icon';
import {useIngredientIdsFromMeals} from '@/hooks/ingredient/ingredientIds';
import {usePossibleMealTypes} from '@/hooks/meal/mealTypes';
import {isNotNullish} from '@/utils/type';


export const MealCoverageCombo = (props: MealCoverageComboCommonProps) => {
  const {mealMap} = props;

  const t = useTranslations('UI.Component.MealCoverageCombo');
  const mealTypes = usePossibleMealTypes(Object.values(mealMap).filter(isNotNullish));
  const [filter, setFilter] = React.useState<MealCoverageComboInput>({
    mealType: mealTypes[0],
    ingredientExclusion: {},
    sort: 'ingredientCoverage',
    resultCount: 15,
  });
  const {data: session} = useSession();
  const {isInputChangeRestricted, isPremium} = useFilterPremiumRestrictable({
    premiumOnly: true,
    session,
  });
  const ingredientIds = useIngredientIdsFromMeals(Object.values(mealMap).filter(isNotNullish));

  const data = useMealCoverageComboData({
    filter,
    ...props,
  });

  if (!data) {
    return null;
  }

  return (
    <Flex className="gap-1 pr-1">
      <MealTypeInput
        mealTypes={mealTypes}
        filter={filter}
        setFilter={setFilter}
        filterKey="mealType"
      />
      <IngredientSelectionInput
        title={<GenericIngredientSlashIcon alt={t('IngredientExclusion')}/>}
        ingredientIds={ingredientIds}
        {...getMultiSelectOnClickProps({
          filter,
          filterKey: 'ingredientExclusion',
          setFilter,
        })}
      />
      <FilterTextInput
        title={
          <Flex direction="row" noFullWidth center className="gap-1.5">
            <PremiumIcon isPremium={isPremium}/>
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
