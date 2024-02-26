import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PokeboxLinkerCurrentPokemonCommonProps} from '@/components/shared/pokebox/linker/current/type';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonName} from '@/components/shared/pokemon/name/main';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {PokeInBox} from '@/types/userData/pokebox';


type Props = PokeboxLinkerCurrentPokemonCommonProps & {
  pokeInBox: PokeInBox,
};

export const PokeboxLinkerCurrentAvailable = ({pokedexMap, subSkillMap, pokeInBox}: Props) => {
  const {pokemon, name, subSkill, nature} = pokeInBox;

  const pokemonInfo = pokedexMap[pokemon];
  if (!pokemonInfo) {
    return null;
  }

  return (
    <Flex center className="gap-1">
      <PokemonName pokemon={pokemonInfo} override={name} size="sm"/>
      <div className="relative size-16">
        <PokemonImage
          pokemonId={pokemon}
          image={{type: 'default', image: 'icon'}}
          isShiny={false}
          className="rounded-lg"
        />
      </div>
      <PokemonSubSkillIndicator subSkill={subSkill} subSkillMap={subSkillMap}/>
      <PokemonNatureIndicator nature={nature}/>
    </Flex>
  );
};
