import React from 'react';

import {StarIcon} from '@heroicons/react/24/solid';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {SleepStyleCommon} from '@/types/game/sleepStyle';
import {Dimension} from '@/types/style';


type Props<TSleepStyle extends SleepStyleCommon> = {
  sleepStyle: TSleepStyle,
  className?: string,
  iconDimension?: Dimension,
  textShadow?: boolean,
  noText?: boolean,
};

export const SleepStyleBrief = <TSleepStyle extends SleepStyleCommon>({
  sleepStyle,
  className,
  iconDimension,
  textShadow,
  noText,
}: Props<TSleepStyle>) => {
  const t = useTranslations('Game.SleepFace');

  const {rarity} = sleepStyle;

  return (
    <Flex noFullWidth direction="row" className={clsx('items-center gap-1.5 whitespace-nowrap', className)}>
      <Flex direction="row" noFullWidth className="items-center gap-0.5">
        <StarIcon className={iconDimension ?? 'h-5 w-5'}/>
        <div>{rarity}</div>
      </Flex>
      {
        !noText &&
        <div className={clsx('truncate', textShadow && 'text-shadow-preset')}>
          {t(sleepStyle.i18nKey)}
        </div>
      }
    </Flex>
  );
};
