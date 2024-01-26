import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {UnavailableIcon} from '@/components/shared/common/unavailable';
import {PokemonTypeIcon} from '@/components/shared/icon/pokeType';
import {imageIconSizes} from '@/styles/image';
import {PokemonInfo} from '@/types/game/pokemon';
import {Dimension} from '@/types/style';


export type Props = {
  pokemon: PokemonInfo | null,
  dimension?: Dimension,
};

export const PokemonClickableIconImage = ({pokemon, dimension}: Props) => {
  const t = useTranslations('Game');
  dimension = dimension ?? 'size-14';

  if (!pokemon) {
    return <UnavailableIcon dimension={dimension}/>;
  }

  const {id, type} = pokemon;

  return (
    <>
      <div className="absolute left-0.5 top-0.5 z-10">
        <PokemonTypeIcon type={type} dimension="size-5"/>
      </div>
      <div className={clsx('relative', dimension)}>
        <NextImage
          src={`/images/pokemon/icons/${id}.png`}
          alt={t(`PokemonName.${id}`)}
          sizes={imageIconSizes}
        />
      </div>
    </>
  );
};
