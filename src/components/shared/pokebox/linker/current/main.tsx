import React from 'react';

import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Flex} from '@/components/layout/flex/common';
import {PokeboxLinkerCurrentAvailable} from '@/components/shared/pokebox/linker/current/available';
import {PokemonLinkerCurrentEmpty} from '@/components/shared/pokebox/linker/current/empty';
import {PokeInBox} from '@/types/userData/pokebox';
import {Nullable} from '@/utils/type';


type Props = {
  pokeInBox: Nullable<PokeInBox>,
};

export const PokeboxLinkerCurrentPokemon = ({pokeInBox}: Props) => {
  return (
    <Flex center className="info-section-bg rounded-lg p-2">
      <AnimatedCollapse show={!!pokeInBox} appear>
        {pokeInBox && <PokeboxLinkerCurrentAvailable pokeInBox={pokeInBox}/>}
      </AnimatedCollapse>
      <AnimatedCollapse show={!pokeInBox} className="flex justify-center">
        <PokemonLinkerCurrentEmpty/>
      </AnimatedCollapse>
    </Flex>
  );
};
