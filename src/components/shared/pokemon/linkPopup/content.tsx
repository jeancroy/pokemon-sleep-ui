import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {NextLink} from '@/components/shared/common/link/main';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonName} from '@/components/shared/pokemon/name/main';
import {PokemonSleepTypeIcon} from '@/components/shared/pokemon/sleepType/icon';
import {PokemonSpecialtyIcon} from '@/components/shared/pokemon/specialty/icon';
import {imageIconSizes} from '@/styles/image';
import {PokemonInfo} from '@/types/game/pokemon';


type Props = {
  pokemon: PokemonInfo,
};

export const PokemonLinkPopupContent = ({pokemon}: Props) => {
  const t = useTranslations('UI.Metadata');
  const t2 = useTranslations('Game');

  const {id, sleepType, specialty} = pokemon;

  const name = t2(`PokemonName.${id}`);

  return (
    <Flex center className="gap-1.5 md:w-96">
      <PokemonName size="lg" pokemon={pokemon}/>
      <Flex direction="row" center className="gap-1">
        <PokemonSleepTypeIcon sleepType={sleepType} dimension="size-5"/>
        <PokemonSpecialtyIcon specialty={specialty} dimension="size-5"/>
      </Flex>
      <div className="relative size-60">
        <PokemonImage pokemonId={pokemon.id} image={{type: 'default', image: 'portrait'}} isShiny={false}/>
      </div>
      <Flex direction="row" className="gap-2">
        <Flex>
          <NextLink href={`/pokedex/${id}`}>
            <Flex center className="button-clickable-bg group p-2">
              <GenericPokeballIcon dimension="size-10" alt={t('Pokedex.Main.Page.Title', {name})}/>
            </Flex>
          </NextLink>
        </Flex>
        <Flex>
          <NextLink href={`/analysis/${id}`}>
            <Flex center className="button-clickable-bg group p-2">
              <div className="relative size-10">
                <NextImage
                  src="/images/generic/analysis.png" alt={t('Analysis.Title', {name})}
                  sizes={imageIconSizes} className="invert-hoverable"
                />
              </div>
            </Flex>
          </NextLink>
        </Flex>
      </Flex>
    </Flex>
  );
};
