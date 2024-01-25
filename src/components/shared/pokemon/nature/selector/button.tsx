import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import ChevronDownIcon from '@heroicons/react/24/solid/ChevronDownIcon';
import ChevronUpIcon from '@heroicons/react/24/solid/ChevronUpIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {NatureEffectIcon} from '@/components/shared/pokemon/nature/effectIcon';
import {natureStyle} from '@/styles/game/nature';
import {NatureData} from '@/types/game/pokemon/nature';


type Props = {
  data: NatureData | null,
  active: boolean,
  onClick: () => void,
};

export const PokemonNatureSelectorButton = ({data, active, onClick}: Props) => {
  const t = useTranslations('Game');

  return (
    <button onClick={onClick} disabled={active} className={clsx(
      'width-with-gap sm:width-with-gap-2-items group rounded-lg',
      'enabled:button-clickable-border disabled:button-bg',
    )}>
      <Flex direction="row" center className="p-2">
        <div className={clsx('whitespace-nowrap', !data?.buff && !data?.nerf && natureStyle.clean)}>
          {data ? t(`Nature.${data.id}`) : <XCircleIcon className="size-6"/>}
        </div>
        <Flex className="items-center text-sm">
          <Flex direction="row" className={clsx('items-center justify-end gap-0.5', data?.buff && natureStyle.buff)}>
            <ChevronUpIcon className="size-5"/>
            <div className="relative size-5">
              <NatureEffectIcon effectId={data?.buff} showOnNull/>
            </div>
            <div className="whitespace-nowrap">
              {data?.buff && t(`NatureEffect.${data.buff}`)}
            </div>
          </Flex>
          <Flex direction="row" className={clsx('items-center justify-end gap-0.5', data?.nerf && natureStyle.nerf)}>
            <ChevronDownIcon className="size-5"/>
            <div className="relative size-5">
              <NatureEffectIcon effectId={data?.nerf} showOnNull/>
            </div>
            <div className="whitespace-nowrap">
              {data?.nerf && t(`NatureEffect.${data.nerf}`)}
            </div>
          </Flex>
        </Flex>
      </Flex>
    </button>
  );
};
