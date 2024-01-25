import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {SnorlaxRankUI} from '@/components/shared/snorlax/rank';
import {imageIconSizes} from '@/styles/image';
import {SnorlaxRankFinalEstimate} from '@/types/game/rank';
import {Dimension} from '@/types/style';


type Props = {
  finalEstimates: SnorlaxRankFinalEstimate[],
};

export const TeamMakerResultButtonFinalEstimate = ({finalEstimates}: Props) => {
  const t = useTranslations('Game');
  const dimension: Dimension = 'size-4';

  return (
    <Flex noFullWidth direction="row" className="items-center gap-1">
      {finalEstimates.map(({mapId, rank}) => (
        <Flex noFullWidth key={mapId} direction="row" className="relative h-6 w-12 items-center gap-1">
          <NextImage
            src={`/images/field/${mapId}.png`}
            alt={t(`Field.${mapId}`)}
            sizes={imageIconSizes}
            className="rounded-lg opacity-50 dark:opacity-25"
          />
          <Flex center className={clsx('absolute left-0 top-0 z-10 h-full gap-1.5')}>
            {rank ?
              <SnorlaxRankUI hideText rank={rank.rank} dimension={dimension}/> :
              <XCircleIcon className={dimension}/>}
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};
