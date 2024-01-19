import React from 'react';

import Bars3BottomLeftIcon from '@heroicons/react/24/solid/Bars3BottomLeftIcon';
import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/preset/text';
import {Flex} from '@/components/layout/flex/common';
import {sortTypeToI18nId} from '@/components/shared/pokemon/sorter/const';
import {PokemonSortType, pokemonSortType} from '@/components/shared/pokemon/sorter/type';


type Props = {
  sort: PokemonSortType,
  updateSort: (sort: PokemonSortType) => void,
} & ({
  options: PokemonSortType[],
  exclude?: never,
} | {
  options?: never,
  exclude?: PokemonSortType[],
});

export const PokemonSortingPicker = ({sort, updateSort, options, exclude}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex');

  return (
    <FilterTextInput
      onClick={(sort) => updateSort(sort)}
      isActive={(sortOfInput) => sortOfInput === sort}
      title={
        <Flex center>
          <Bars3BottomLeftIcon className="h-6 w-6"/>
        </Flex>
      }
      ids={options ?? [...pokemonSortType].filter((sortType) => !exclude?.includes(sortType))}
      idToText={(sort) => t(sortTypeToI18nId[sort])}
    />
  );
};
