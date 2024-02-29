import React from 'react';

import Bars3BottomLeftIcon from '@heroicons/react/24/solid/Bars3BottomLeftIcon';
import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/preset/text';
import {sortTypeToI18nId} from '@/components/shared/pokemon/sorter/const';
import {PokemonSortType, pokemonSortType} from '@/components/shared/pokemon/sorter/type';


type Props<TSort extends PokemonSortType> = {
  sort: TSort,
  updateSort: (sort: TSort) => void,
} & ({
  options: TSort[],
  exclude?: never,
} | {
  options?: never,
  exclude?: TSort[],
});

export const PokemonSortingPicker = <TSort extends PokemonSortType>({
  sort,
  updateSort,
  options,
  exclude,
}: Props<TSort>) => {
  const t = useTranslations('UI.InPage.Pokedex');

  return (
    <FilterTextInput
      onClick={(sort) => updateSort(sort)}
      isActive={(sortOfInput) => sortOfInput === sort}
      title={<Bars3BottomLeftIcon className="size-6"/>}
      ids={options ?? [...pokemonSortType].filter((sortType) => !exclude?.includes(sortType as TSort)) as TSort[]}
      idToText={(sort) => t(sortTypeToI18nId[sort])}
    />
  );
};
