import React from 'react';

import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import {clsx} from 'clsx';

import {FilterInputOnClickProps} from '@/components/input/filter/common/type';
import {FilterExpandedInput} from '@/components/input/filter/expanded/main';
import {Flex} from '@/components/layout/flex/common';
import {LevelIcon} from '@/components/shared/icon/lv';
import {iconFilterButtonStyle} from '@/styles/input';
import {PokemonKeyLevel, pokemonKeyLevels} from '@/types/game/pokemon/level';


export const PokemonPreviewLevelInput = (props: FilterInputOnClickProps<PokemonKeyLevel | null>) => {
  return (
    <FilterExpandedInput
      title={
        <Flex direction="row" center className="gap-1.5">
          <EyeIcon className="size-6"/>
          <LevelIcon/>
        </Flex>
      }
      ids={[null, ...[...pokemonKeyLevels].sort((a, b) => a - b)]}
      idToButton={(level) => (
        level === null ? <XMarkIcon className="size-7"/> : level
      )}
      className={clsx('text-sm', iconFilterButtonStyle)}
      {...props}
    />
  );
};
