import React from 'react';

import Bars3BottomLeftIcon from '@heroicons/react/24/solid/Bars3BottomLeftIcon';
import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/preset/text';
import {FilterWithUpdaterProps} from '@/components/input/filter/type';
import {getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex/common';
import {PokemonFilter} from '@/components/shared/pokemon/filter/main';
import {producingParamsSortToI18nId} from '@/ui/info/production/client/const';
import {ProducingParamsFilter, producingParamsSort} from '@/ui/info/production/client/type';
import {ProducingParamsDataProps} from '@/ui/info/production/type';


type Props = ProducingParamsDataProps & FilterWithUpdaterProps<ProducingParamsFilter>;

export const ProducingParamsInput = (props: Props) => {
  const t = useTranslations('UI.InPage.Pokedex');

  return (
    <Flex className="info-section">
      <PokemonFilter {...props}/>
      <FilterTextInput
        title={
          <Flex center>
            <Bars3BottomLeftIcon className="size-6"/>
          </Flex>
        }
        ids={[...producingParamsSort]}
        idToText={(sort) => t(producingParamsSortToI18nId[sort])}
        {...getSingleSelectOnClickProps({
          ...props,
          filterKey: 'sort',
          allowNull: false,
        })}
      />
    </Flex>
  );
};
