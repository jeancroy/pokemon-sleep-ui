import React from 'react';

import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon';
import TableCellsIcon from '@heroicons/react/24/outline/TableCellsIcon';

import {I18nMessageKeysOfNamespace} from '@/types/i18n';
import {PokeboxDisplayType, PokeboxViewType} from '@/ui/team/pokebox/viewer/type';


export const pokeboxDisplayTypeToI18nId: {
  [sortType in PokeboxDisplayType]: I18nMessageKeysOfNamespace<'UI.InPage.Team.Box.DisplayType'>
} = {
  info: 'Info',
  pokemon: 'Pokemon',
  productionTotal: 'ProductionTotal',
  productionBerry: 'ProductionBerry',
  productionIngredient: 'ProductionIngredient',
  rating: 'Rating',
  skills: 'Skills',
  frequency: 'Frequency',
  maxCarry: 'MaxCarry',
};

export const pokeboxDisplayTypeToImageSrc: {[sortType in PokeboxDisplayType]: string} = {
  info: '/images/generic/info.png',
  pokemon: '/images/generic/pokeball.png',
  productionTotal: '/images/generic/strengthWhite.png',
  productionBerry: '/images/generic/berry.png',
  productionIngredient: '/images/generic/ingredient.png',
  rating: '/images/generic/search.png',
  skills: '/images/generic/mainSkill.png',
  frequency: '/images/generic/clock.png',
  maxCarry: '/images/generic/bag.png',
};

export const pokeboxViewTypeToIcon: {[viewType in PokeboxViewType]: React.ReactNode} = {
  table: <TableCellsIcon/>,
  grid: <Squares2X2Icon/>,
};
