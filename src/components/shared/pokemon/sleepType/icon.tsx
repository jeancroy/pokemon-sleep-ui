import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {PokemonSleepTypeCommonProps} from '@/components/shared/pokemon/sleepType/type';
import {getSleepTypeBgClass} from '@/styles/game/sleepType';
import {imageSmallIconSizes} from '@/styles/image';


export const PokemonSleepTypeIcon = ({sleepType, dimension, active, className}: PokemonSleepTypeCommonProps) => {
  const t = useTranslations('Game.SleepType');

  return (
    <div className={clsx('rounded-full p-0.5', getSleepTypeBgClass(sleepType, active ?? false))}>
      <div className={clsx('relative', dimension ?? 'size-5')}>
        <NextImage
          src={`/images/sleepType/${sleepType}.png`} alt={t(sleepType.toString())}
          sizes={imageSmallIconSizes} className={clsx(className, active ? 'invert-on-light' : 'invert-on-dark')}
        />
      </div>
    </div>
  );
};
