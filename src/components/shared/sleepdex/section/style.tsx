import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {SleepdexSectionProps} from '@/components/shared/sleepdex/section/type';
import {SleepdexStyleIcon} from '@/components/shared/sleepdex/styleIcon';
import {getToggleButtonClass} from '@/styles/input';
import {PokemonId} from '@/types/game/pokemon';
import {SleepStyleId} from '@/types/game/sleepStyle';
import {isInSleepdex} from '@/utils/game/sleepdex';


type Props = SleepdexSectionProps & {
  pokemonId: PokemonId,
  styleId: SleepStyleId,
};

export const SleepdexSectionSleepStyle = ({sleepdex, updateSleepdex, pokemonId, styleId}: Props) => {
  const className = clsx(
    'size-8 rounded-lg text-sm',
    getToggleButtonClass(isInSleepdex({sleepdex, pokemonId, styleId}) ?? false),
  );

  return (
    <button className={className} onClick={() => updateSleepdex({pokemonId, styleId})}>
      <Flex center>
        <SleepdexStyleIcon styleId={styleId}/>
      </Flex>
    </button>
  );
};
