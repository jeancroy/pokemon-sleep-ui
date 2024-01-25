import React from 'react';

import BookmarkIcon from '@heroicons/react/24/outline/BookmarkIcon';
import LockOpenIcon from '@heroicons/react/24/outline/LockOpenIcon';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import QuestionMarkCircleIcon from '@heroicons/react/24/solid/QuestionMarkCircleIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {MapSleepdexUnlockCount} from '@/components/shared/sleepStyle/common/sleepdexUnlock';
import {MapIndexSleepdexCompletionOfMap} from '@/components/shared/sleepStyle/common/type';
import {imageIconSizes, imageSmallIconSizes} from '@/styles/image';
import {MapMeta} from '@/types/game/mapMeta';
import {SleepStyleNormalFlattened} from '@/types/game/sleepStyle';
import {toUnique} from '@/utils/array';


type Props = {
  sleepStyles: SleepStyleNormalFlattened[] | undefined,
  sleepdexCompletionOfMap: MapIndexSleepdexCompletionOfMap | undefined,
  meta: MapMeta | null | undefined,
  isLoggedIn: boolean,
};

export const MapStats = ({sleepStyles, sleepdexCompletionOfMap, meta, isLoggedIn}: Props) => {
  const t = useTranslations('UI.InPage.Map');
  const t2 = useTranslations('UI.Common');

  const sleepStyleCount = sleepStyles?.length ?? 0;
  const pokemonCount = toUnique(sleepStyles?.map(({pokemonId}) => pokemonId) ?? []).length;

  return (
    <Flex center className="gap-1">
      <Flex direction="row" center className="gap-4 text-lg">
        <Flex direction="row" center noFullWidth className="gap-1.5">
          <div className="relative size-6">
            <NextImage
              src="/images/generic/sleep.png" alt={t('SleepStyle')}
              sizes={imageIconSizes} className="invert-hoverable"
            />
          </div>
          <div>
            {sleepStyleCount}
          </div>
        </Flex>
        <Flex direction="row" center noFullWidth className="gap-1.5">
          <GenericPokeballIcon dimension="size-6" alt={t('Pokemon')}/>
          <div>
            {pokemonCount}
          </div>
        </Flex>
        {
          isLoggedIn && sleepdexCompletionOfMap &&
          <Flex direction="row" center noFullWidth className="gap-1.5">
            <BookmarkIcon className="size-6"/>
            <div>
              <MapSleepdexUnlockCount sleepdexCompletionOfMap={sleepdexCompletionOfMap}/>
            </div>
          </Flex>
        }
      </Flex>
      <Flex direction="row" center className="gap-5">
        <div className="relative size-10">
          <NextImage
            src="/images/generic/snorlax.png" alt={t2('SnorlaxFavorite')} sizes={imageSmallIconSizes}
          />
        </div>
        <Flex direction="row" center noFullWidth className="gap-1">
          {meta?.berry ?
            meta?.berry.map((berry) => <PokemonBerryIcon key={berry} dimension="size-8" id={berry}/>) :
            <QuestionMarkCircleIcon className="size-8"/>}
        </Flex>
      </Flex>
      <Flex direction="row" noFullWidth center className={clsx(
        'w-fit gap-1 rounded-lg bg-slate-300/40 p-2 dark:bg-slate-500/40',
      )}>
        <LockOpenIcon className="size-5" title={t('UnlockConditions')}/>
        {meta?.unlock ?
          <>
            <div className="relative size-6">
              <NextImage
                src="/images/generic/sleep.png" alt={t('SleepStyle')}
                sizes={imageIconSizes} className="invert-hoverable"
              />
            </div>
            <div>{meta.unlock.count}</div>
          </> :
          <XCircleIcon className="size-5"/>
        }
      </Flex>
    </Flex>
  );
};
