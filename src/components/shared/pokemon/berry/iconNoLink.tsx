import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {BerryIconCommonProps} from '@/components/shared/pokemon/berry/type';
import {imageSmallIconSizes} from '@/styles/image';


export const PokemonBerryIconNoLink = ({id, dimension, sizes, className}: BerryIconCommonProps) => {
  const t = useTranslations('Game.Berry');

  return (
    <div className={clsx('relative', dimension ?? 'size-5', className)}>
      <NextImage src={`/images/berry/${id}.png`} alt={t(id.toString())} sizes={sizes ?? imageSmallIconSizes}/>
    </div>
  );
};
