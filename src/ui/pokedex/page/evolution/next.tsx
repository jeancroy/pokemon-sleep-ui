import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {UsePokemonLinkPopupReturn} from '@/components/shared/pokemon/linkPopup/type';
import {PokedexMap} from '@/types/game/pokemon';
import {EvolutionBranch} from '@/types/game/pokemon/evolution';
import {PokemonEvolutionCondition} from '@/ui/pokedex/page/evolution/condition';
import {PokemonEvolutionPortrait} from '@/ui/pokedex/page/evolution/portrait';


type Props = {
  pokedexMap: PokedexMap,
  evolutions: EvolutionBranch[],
  showPokemon: UsePokemonLinkPopupReturn['showPokemon'],
};

export const PokemonEvolutionNextStage = ({pokedexMap, evolutions, showPokemon}: Props) => {
  return (
    <Flex direction="row" noFullWidth wrap center className="gap-2">
      {evolutions.map(({id, conditions}) => (
        <Flex key={id} noFullWidth className="gap-1">
          <PokemonEvolutionPortrait dimension="size-44" pokemon={pokedexMap[id]} showPokemon={showPokemon}/>
          {conditions.map((condition, idx) => (
            <PokemonEvolutionCondition key={idx} condition={condition}/>
          ))}
        </Flex>
      ))}
    </Flex>
  );
};
