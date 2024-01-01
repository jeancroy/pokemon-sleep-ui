import React from 'react';

import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex/common';
import {PokemonCollapsibleFilter} from '@/components/shared/pokemon/predefined/filter';
import {SnorlaxFavoriteInput} from '@/components/shared/snorlax/favorite';
import {TeamMakerInputCooking} from '@/ui/team/maker/input/cooking';
import {TeamMakerInputGeneral} from '@/ui/team/maker/input/general';
import {TeamMakerInputToggles} from '@/ui/team/maker/input/toggle';
import {TeamMakerInputCommonProps} from '@/ui/team/maker/input/type';
import {TeamMakerInputVanillaPresets} from '@/ui/team/maker/input/vanillaPresets';
import {isNotNullish} from '@/utils/type';


export const TeamMakerInputUI = (props: TeamMakerInputCommonProps) => {
  const {
    input,
    setInput,
    pokedexMap,
    mapMeta,
  } = props;
  const {
    pokemon,
  } = input;

  const collapsible = useCollapsible();

  return (
    <Flex className="gap-1">
      <SnorlaxFavoriteInput
        filter={input}
        setFilter={setInput}
        filterKey="snorlaxFavorite"
        pokemonList={Object.values(pokedexMap).filter(isNotNullish)}
        mapMeta={mapMeta}
      />
      <TeamMakerInputCooking {...props}/>
      <PokemonCollapsibleFilter
        collapsibleState={collapsible}
        pokemonList={Object.values(pokedexMap).filter(isNotNullish)}
        filter={pokemon}
        setFilter={(getUpdated) => setInput(({pokemon, ...original}) => ({
          ...original,
          pokemon: getUpdated(pokemon),
        }))}
        {...props}
      />
      <TeamMakerInputGeneral {...props}/>
      <TeamMakerInputVanillaPresets {...props}/>
      <TeamMakerInputToggles {...props}/>
    </Flex>
  );
};
