import React from 'react';

import {BackspaceIcon} from '@heroicons/react/24/outline';

import {PokedexInputProps} from '@/ui/pokedex/index/input/type';
import {PokedexDisplay} from '@/ui/pokedex/index/type';
import {generateInitialFilter} from '@/ui/pokedex/index/utils';


type Props = {
  setFilter: PokedexInputProps['setFilter'],
  preloadedDisplay: Partial<PokedexDisplay> | undefined,
};

export const PokedexInputClearer = ({setFilter, preloadedDisplay}: Props) => {
  return (
    <button
      className="button-clickable-bg !rounded-full p-1.5"
      onClick={() => setFilter(() => generateInitialFilter(preloadedDisplay))}
    >
      <BackspaceIcon className="size-6"/>
    </button>
  );
};
