import React from 'react';

import {clsx} from 'clsx';

import {NextImage} from '@/components/shared/common/image/main';
import {imageSmallIconSizes} from '@/styles/image';
import {SleepStyleId} from '@/types/game/sleepStyle';
import {Dimension} from '@/types/style';


type Props = {
  styleId: SleepStyleId,
  dimension?: Dimension,
};

export const SleepdexStyleIcon = ({styleId, dimension}: Props) => {
  if (styleId === 'onSnorlax') {
    return (
      <div className={clsx('relative', dimension ?? 'size-6')}>
        <NextImage src="/images/generic/snorlax.png" alt={styleId} sizes={imageSmallIconSizes}/>
      </div>
    );
  }

  return `#${styleId}`;
};
