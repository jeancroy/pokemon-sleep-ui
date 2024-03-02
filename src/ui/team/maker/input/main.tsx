import React from 'react';

import {useCollapsibleControl} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex/common';
import {PokemonCollapsibleFilter} from '@/components/shared/pokemon/predefined/filter';
import {SnorlaxFavoriteInput} from '@/components/shared/snorlax/favorite';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {TeamMakerInputCooking} from '@/ui/team/maker/input/cooking';
import {TeamMakerInputGeneral} from '@/ui/team/maker/input/general';
import {TeamMakerInputToggles} from '@/ui/team/maker/input/toggle';
import {TeamMakerInputCommonProps} from '@/ui/team/maker/input/type';
import {TeamMakerInputVanillaPresets} from '@/ui/team/maker/input/vanillaPresets';
import {toPokemonList} from '@/utils/game/pokemon/utils';


export const TeamMakerInputUI = (props: TeamMakerInputCommonProps) => {
  const {
    input,
    setInput,
  } = props;
  const {pokemon} = input;

  const {
    pokedexMap,
    fieldMetaMap,
  } = useCommonServerData();

  const collapsible = useCollapsibleControl();
  const pokemonList = React.useMemo(() => toPokemonList(pokedexMap), [pokedexMap]);

  return (
    <Flex className="gap-1">
      <SnorlaxFavoriteInput
        filter={input}
        setFilter={setInput}
        filterKey="snorlaxFavorite"
        pokemonList={pokemonList}
        fieldMetaMap={fieldMetaMap}
      />
      <TeamMakerInputCooking {...props}/>
      <PokemonCollapsibleFilter
        collapsibleState={collapsible}
        pokemonList={pokemonList}
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
