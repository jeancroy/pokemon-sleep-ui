import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {PokemonInfo} from '@/types/game/pokemon';
import {PokeInBoxOpenRatingButton} from '@/ui/team/pokebox/content/pokeInBox/common/rating/button';
import {PokeInBoxViewUnitProps} from '@/ui/team/pokebox/content/pokeInBox/type';


type Props = PokeInBoxViewUnitProps & {
  pokemon: PokemonInfo,
  pokemonName: string,
};

export const PokeInBoxGridPopUps = (props: Props) => {
  const {
    pokemon,
    pokemonName,
  } = props;

  const t = useTranslations('UI.Metadata');

  const {state, setState, showPokemon} = usePokemonLinkPopup();

  return (
    <Flex direction="row" noFullWidth className="absolute right-1 top-1 z-20 gap-1">
      <PokemonLinkPopup state={state} setState={setState}/>
      <button className="button-clickable group h-6 w-6 rounded-full" onClick={() => showPokemon(pokemon)}>
        <GenericPokeballIcon alt={t('Pokedex.Main.Page.Title', {name: pokemonName})} noWrap/>
      </button>
      <PokeInBoxOpenRatingButton {...props}/>
    </Flex>
  );
};
