import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {NatureEffectIcon} from '@/components/shared/pokemon/nature/effectIcon';
import {natureEffectIconMap} from '@/const/game/nature';
import {NatureInfoEffectProps} from '@/ui/info/nature/type';


export const NatureInfoEffectText = ({direction, effectId, dimension, isActive, className}: NatureInfoEffectProps) => {
  const t = useTranslations('Game');

  dimension = dimension ?? 'size-5';
  const hasEffect = effectId !== null;

  return (
    <Flex direction="row" className={clsx('items-center gap-0.5', className)}>
      <div className={dimension}>
        {natureEffectIconMap[direction]}
      </div>
      <div className={clsx('relative', dimension)}>
        <NatureEffectIcon effectId={effectId} showOnNull isActive={isActive}/>
      </div>
      <div className="whitespace-nowrap">
        {hasEffect && `${t(`NatureEffect.${effectId}`)}`}
      </div>
    </Flex>
  );
};
