import React from 'react';

import BookmarkIcon from '@heroicons/react/24/solid/BookmarkIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InfoIcon} from '@/components/icons/info';
import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {IconWithInfo} from '@/components/shared/common/image/iconWithInfo';
import {NextImage} from '@/components/shared/common/image/main';
import {PokeboxImporterCommonProps} from '@/components/shared/pokebox/importer/type';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {pokeInBoxFavoriteStyle} from '@/styles/game/pokebox';
import {imageIconSizes, imageSmallIconSizes} from '@/styles/image';
import {PokeInBox} from '@/types/userData/pokebox/main';


type Props = PokeboxImporterCommonProps & {
  pokeInBox: PokeInBox,
};

export const PokeboxImporterUnit = ({subSkillMap, onPokeboxPicked, pokeInBox}: Props) => {
  const {
    pokemon,
    level,
    name,
    subSkill,
    nature,
    isShiny,
    isFavorite,
  } = pokeInBox;

  const t = useTranslations('UI.Common');
  const t2 = useTranslations('Game');

  const pokemonDefaultName = t2(`PokemonName.${pokemon}`);

  return (
    <FlexButton
      key={pokeInBox.uuid}
      direction="col"
      noFullWidth={false}
      className="button-clickable-bg group relative items-center p-1"
      onClick={() => onPokeboxPicked(pokeInBox)}
    >
      <div className="absolute bottom-1 right-1">
        <IconWithInfo
          imageSrc={`/images/pokemon/icons/${pokemon}.png`}
          imageAlt={t2(`PokemonName.${pokemon}`)}
          imageDimension="size-12"
          imageSizes={imageIconSizes}
          info={level}
          className="shrink-0 opacity-70"
          classNameImage="rounded-lg"
        />
      </div>
      <Flex direction="row" className={clsx('gap-1', isFavorite && pokeInBoxFavoriteStyle)}>
        {
          isShiny &&
          <InfoIcon>
            <div className="relative size-4">
              <NextImage
                src="/images/generic/flash.png" alt={t('Shiny')}
                sizes={imageSmallIconSizes} className="invert-on-light"
              />
            </div>
          </InfoIcon>
        }
        {isFavorite && <BookmarkIcon className="size-5"/>}
        <div className="truncate">
          {name ?? pokemonDefaultName}
        </div>
      </Flex>
      <Flex direction="row" className="gap-1">
        <PokemonSubSkillIndicator
          subSkill={subSkill}
          subSkillMap={subSkillMap}
          level={level}
        />
        <PokemonNatureIndicator nature={nature} hideName/>
      </Flex>
    </FlexButton>
  );
};
