import React from 'react';

import {BackspaceIcon} from '@heroicons/react/24/outline';

import {PokedexInputProps} from '@/ui/pokedex/index/input/type';
import {PokedexFilterSave} from '@/ui/pokedex/index/type';
import {generateInitialFilter} from '@/ui/pokedex/index/utils';
import {Nullable} from '@/utils/type';


type Props = {
  setFilter: PokedexInputProps['setFilter'],
  preloadedDisplay: Nullable<Partial<PokedexFilterSave>>,
};

export const PokedexInputClearer = ({setFilter, preloadedDisplay}: Props) => {
  return (
    <button
      className="button-clickable-bg !rounded-full p-1.5"
      onClick={() => setFilter(() => generateInitialFilter(preloadedDisplay ?? {}))}
    >
      <BackspaceIcon className="size-6"/>
    </button>
  );
};
