import React from 'react';

import {useTranslations} from 'next-intl';

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

  if (image.type === 'default') {
    return <GenericPokeballIcon alt={t(pokemonId.toString())} isActive={isActive}/>;
  }

  return t2(image.i18nKey);
};
