import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {PokemonImageType} from '@/components/shared/pokemon/image/type';
import {PokemonId} from '@/types/game/pokemon';


type Props = {
  pokemonId: PokemonId,
  image: PokemonImageType,
  isActive: boolean,
};

export const PokemonGalleryButton = ({pokemonId, image, isActive}: Props) => {
  const t = useTranslations('Game.PokemonName');
  const t2 = useTranslations('Game.SleepFace');
  const t3 = useTranslations('UI.Image');

  if (image.type === 'default') {
    return (
      <Flex direction="row" noFullWidth className="gap-0.5">
        <GenericPokeballIcon alt={t(pokemonId.toString())} isActive={isActive}/>
        <span>
          {image.image === 'portrait' && t3('Portrait')}
          {image.image === 'happy' && t3('Eating')}
        </span>
      </Flex>
    );
  }

  return t2(image.i18nKey);
};
