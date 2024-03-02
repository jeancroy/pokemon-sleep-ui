import React from 'react';

import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import {clsx} from 'clsx';

import {FilterInputOnClickProps} from '@/components/input/filter/common/type';
import {FilterExpandedInput} from '@/components/input/filter/expanded/main';
import {Flex} from '@/components/layout/flex/common';
import {LevelIcon} from '@/components/shared/icon/lv';
import {useSortedPokemonKeyLevels} from '@/hooks/pokemon/keyLevel/sorted';
import {iconFilterButtonStyle} from '@/styles/input';
import {PokemonKeyLevel} from '@/types/game/pokemon/level';


export const PokemonPreviewLevelInput = (props: FilterInputOnClickProps<PokemonKeyLevel | null>) => {
  const sortedPokemonLevels = useSortedPokemonKeyLevels();

  return (
    <FilterExpandedInput
      title={
        <Flex direction="row" center className="gap-1.5">
          <EyeIcon className="size-6"/>
          <LevelIcon/>
        </Flex>
      }
      ids={[null, ...sortedPokemonLevels]}
      idToButton={(level) => (
        level === null ? <XMarkIcon className="size-7"/> : level.toString().toUpperCase()
      )}
      className={clsx('text-sm', iconFilterButtonStyle)}
      {...props}
    />
  );
};
