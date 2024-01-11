'use client';
import React from 'react';

import {Transition} from '@headlessui/react';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {PokemonGalleryButton} from '@/components/shared/pokemon/gallery/button';
import {gallerySize} from '@/components/shared/pokemon/gallery/const';
import {PokemonGalleryCommonProps} from '@/components/shared/pokemon/gallery/type';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonImageType} from '@/components/shared/pokemon/image/type';
import {textFilterButtonStyle} from '@/styles/input';
import {getAvailableSleepStylesFromNormal, getAvailableSleepStylesFromSpecial} from '@/utils/game/sleepdex';


export const PokemonGallery = ({
  pokemon,
  pokemonBranch,
  sleepStyles,
  sleepStylesSpecial,
}: PokemonGalleryCommonProps) => {
  const t = useTranslations('UI.Common');

  const imageOptions: PokemonImageType[] = React.useMemo(() => [
    'portrait',
    ...getAvailableSleepStylesFromNormal({
      sleepStyles,
      extractor: ({i18nKey}) => i18nKey,
    }),
    ...getAvailableSleepStylesFromSpecial({
      sleepStyles: sleepStylesSpecial,
      extractor: ({i18nKey}) => i18nKey,
    }),
  ], [sleepStyles, sleepStylesSpecial]);
  const [isShiny, setShiny] = React.useState(false);
  const [currentImage, setCurrentImage] = React.useState<PokemonImageType>('portrait');

  return (
    <Flex center>
      <Flex center noFullWidth className={clsx('relative', gallerySize)}>
        {imageOptions
          .flatMap<[PokemonImageType, boolean]>((image) => [[image, true], [image, false]])
          .map(([image, imageShiny]) => (
            <Transition
              key={`${image}-${imageShiny}`}
              show={image === currentImage && isShiny === imageShiny}
              enter="transition-opacity duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className={clsx('absolute', gallerySize)}
            >
              <PokemonImage pokemonId={pokemon.id} image={image} isShiny={imageShiny}/>
            </Transition>
          ))}
      </Flex>
      <Flex direction="row" center wrap className="gap-1.5">
        <ToggleButton
          active={isShiny}
          onClick={() => setShiny(!isShiny)}
          className={textFilterButtonStyle}
        >
          {t('Shiny')}
        </ToggleButton>
        {imageOptions.map((image) => {
          const isActive = currentImage === image;

          return (
            <ToggleButton
              key={image}
              active={isActive}
              onClick={() => setCurrentImage(image)}
              className={textFilterButtonStyle}
            >
              <PokemonGalleryButton
                pokemonId={pokemon.id}
                pokemonBranch={pokemonBranch}
                image={image}
                isActive={isActive}
              />
            </ToggleButton>
          );
        })}
      </Flex>
    </Flex>
  );
};
