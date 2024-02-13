import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {PokemonTypeIcon} from '@/components/shared/icon/pokeType';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {PokedexLinkDetail} from '@/ui/pokedex/index/linkDetail';
import {PokedexLinkProps} from '@/ui/pokedex/index/type';


export const PokedexLink = (props: PokedexLinkProps) => {
  const {pokemon} = props;
  const {id, type} = pokemon;
  const t = useTranslations('Game');
  const {state, setState, showPokemon} = usePokemonLinkPopup();

  return (
    <div className="button-clickable-bg group relative">
      <PokemonLinkPopup state={state} setState={setState}/>
      <Flex noFullWidth className="absolute bottom-1 left-1 z-10 gap-0.5 text-sm">
        <PokedexLinkDetail {...props}/>
      </Flex>
      <FlexButton
        noFullWidth={false}
        onClick={() => showPokemon(pokemon)}
        className="h-18 justify-end gap-1.5 rounded-lg"
      >
        <Flex direction="row" noFullWidth className={clsx(
          'absolute left-1 top-1 z-10 items-center gap-0.5 whitespace-nowrap',
        )}>
          <PokemonTypeIcon type={type} dimension="size-5"/>
          <div>
            {t(`PokemonName.${id}`)}
          </div>
        </Flex>
        <div className="relative size-16 self-end opacity-70">
          <PokemonImage
            pokemonId={id}
            image={{type: 'default', image: 'icon'}}
            isShiny={false}
            alt={t(`PokemonName.${id}`)}
            className="rounded-lg"
          />
        </div>
      </FlexButton>
    </div>
  );
};
