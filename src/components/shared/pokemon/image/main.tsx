import React from 'react';

import {NextImage, NextImageProps} from '@/components/shared/common/image/main';
import {PokemonImageType} from '@/components/shared/pokemon/image/type';
import {imagePortraitSizes} from '@/styles/image';
import {PokemonId} from '@/types/game/pokemon';


type Props = {
  pokemonId: PokemonId | null,
  image: PokemonImageType,
  isShiny: boolean,
  alt?: string,
  className?: string,
};

export const PokemonImage = ({pokemonId, image, isShiny, alt, className}: Props) => {
  const commonImageProps: Pick<NextImageProps, 'sizes' | 'className'> = {
    sizes: imagePortraitSizes,
    className,
  };

  if (!pokemonId) {
    return (
      <NextImage
        {...commonImageProps}
        src="/images/generic/pokeballUnavailable.png"
        alt="N/A"
      />
    );
  }

  const actualAlt = alt ?? `Pokemon #${pokemonId}`;

  const {type} = image;

  if (type === 'default') {
    if (image.image === 'portrait') {
      return (
        <NextImage
          {...commonImageProps}
          src={`/images/pokemon/portrait/${isShiny ? 'shiny/' : ''}${pokemonId}.png`}
          alt={actualAlt}
        />
      );
    }

    if (image.image === 'icon') {
      return (
        <NextImage
          {...commonImageProps}
          src={`/images/pokemon/icons/${pokemonId}.png`}
          alt={actualAlt}
        />
      );
    }

    if (image.image === 'happy') {
      return (
        <NextImage
          {...commonImageProps}
          src={`/images/pokemon/happy/${isShiny ? 'shiny/' : ''}${pokemonId}.png`}
          alt={actualAlt}
        />
      );
    }

    throw new Error(`Unhandled Pokemon default image [${image.image satisfies never}]`);
  }

  if (type === 'sleepStyle') {
    return (
      <NextImage
        {...commonImageProps}
        src={`/images/sleep/${image.sleepStyleId}/${isShiny ? 'shiny/' : ''}${pokemonId}.png`}
        alt={actualAlt}
      />
    );
  }

  throw new Error(`Unhandled Pokemon image type [${type satisfies never}]`);
};
