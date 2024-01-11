import React from 'react';

import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/preset/text';
import {getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex/common';
import {ratingWeightedStatsBasisI18nId} from '@/const/game/rating';
import {RatingConfig, ratingWeightedStatsBasis} from '@/types/game/pokemon/rating/config';
import {ReactStateUpdaterFromOriginal} from '@/types/react';


type Props = {
  config: RatingConfig,
  setConfig: ReactStateUpdaterFromOriginal<RatingConfig>,
};

export const RatingResultInput = ({config, setConfig}: Props) => {
  const t = useTranslations('UI.Rating.WeightedStatsBasis');

  return (
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
  );
};
