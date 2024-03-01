import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {FlexDirection} from '@/components/layout/flex/type';
import {ProducingStateIcon} from '@/components/shared/icon/producingState';
import {PokemonTimeToFullPackSingle} from '@/components/shared/pokemon/inventory/fullPack/single';
import {PokemonInventoryCommonProps} from '@/components/shared/pokemon/inventory/type';
import {FullPackStats} from '@/types/game/producing/inventory';


type Props = PokemonInventoryCommonProps & {
  direction: FlexDirection,
  fullPackStats: FullPackStats,
};

export const PokemonTimeToFullPack = ({direction, fullPackStats, ...props}: Props) => {
  const t = useTranslations('UI.Pokemon.Stats.TimeToFullPack');
  const t2 = useTranslations('UI.Producing.State.Asleep');

  return (
    <Flex direction={direction} noFullWidth className={clsx(direction === 'row' && 'gap-3')}>
      <PokemonTimeToFullPackSingle
        title={<ProducingStateIcon state="sleep1Filled" alt={t2('Primary.Filled')}/>}
        alt={t('Primary')}
        fullPackStatsOfSleep={fullPackStats.bySleep.primary}
        {...props}
      />
      <PokemonTimeToFullPackSingle
        title={<ProducingStateIcon state="sleep2Filled" alt={t2('Secondary.Filled')}/>}
        alt={t('Secondary')}
        fullPackStatsOfSleep={fullPackStats.bySleep.secondary}
        {...props}
      />
    </Flex>
  );
};
