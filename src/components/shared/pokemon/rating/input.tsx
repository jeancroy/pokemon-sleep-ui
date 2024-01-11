import React from 'react';

import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import {Session} from 'next-auth';
import {useTranslations} from 'next-intl';

import {useFilterPremiumRestrictable} from '@/components/input/filter/common/premium/hook';
import {FilterTextInput} from '@/components/input/filter/preset/text';
import {getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex/common';
import {PremiumIcon} from '@/components/static/premium/icon';
import {ratingResultCategoryI18nId, ratingWeightedStatsBasisI18nId} from '@/const/game/rating';
import {RatingConfig, ratingWeightedStatsBasis} from '@/types/game/pokemon/rating/config';
import {ratingResultCategory} from '@/types/game/pokemon/rating/result';
import {ReactStateUpdaterFromOriginal} from '@/types/react';
import {Nullable} from '@/utils/type';


type Props = {
  session: Nullable<Session>,
  config: RatingConfig,
  setConfig: ReactStateUpdaterFromOriginal<RatingConfig>,
};

export const RatingResultInput = ({session, config, setConfig}: Props) => {
  const t = useTranslations('UI.Rating');
  const {isInputChangeRestricted, isPremium} = useFilterPremiumRestrictable({
    premiumOnly: true,
    session,
  });

  return (
    <>
      <FilterTextInput
        title={
          <Flex center>
            <ChartBarIcon className="h-6 w-6"/>
          </Flex>
        }
        ids={[...ratingWeightedStatsBasis]}
        idToText={(basis) => t(ratingWeightedStatsBasisI18nId[basis])}
        {...getSingleSelectOnClickProps({
          filter: config,
          setFilter: setConfig,
          filterKey: 'basis',
          allowNull: false,
        })}
      />
      <FilterTextInput
        title={
          <Flex direction="row" noFullWidth center className="gap-1.5">
            {!isPremium && <PremiumIcon/>}
            {t('Category.Title')}
          </Flex>
        }
        ids={[...ratingResultCategory]}
        idToText={(basis) => t(ratingResultCategoryI18nId[basis])}
        {...getSingleSelectOnClickProps({
          filter: config,
          setFilter: setConfig,
          filterKey: 'category',
          allowNull: false,
          isAllowed: () => !isInputChangeRestricted(),
        })}
      />
    </>
  );
};
