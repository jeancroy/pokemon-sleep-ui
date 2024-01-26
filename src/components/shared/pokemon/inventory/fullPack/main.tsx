import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {FlexDirection} from '@/components/layout/flex/type';
import {ProducingStateIcon} from '@/components/shared/icon/producingState';
import {PokemonTimeToFullPackSingle} from '@/components/shared/pokemon/inventory/fullPack/single';
import {PokemonInventoryCommonProps} from '@/components/shared/pokemon/inventory/type';
import {TimeToFullPack} from '@/types/game/producing/carryLimit';


type Props = PokemonInventoryCommonProps & {
  direction: FlexDirection,
  timeToFullPack: TimeToFullPack,
};

export const PokemonTimeToFullPack = ({direction, timeToFullPack, ...props}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex');
  const t2 = useTranslations('UI.Producing.State.Asleep');

  return (
    <Flex direction={direction} noFullWidth className={clsx(direction === 'row' && 'gap-3')}>
      <PokemonTimeToFullPackSingle
        title={<ProducingStateIcon state="sleep1Filled" alt={t2('Primary.Filled')}/>}
        alt={t('Stats.TimeToFullPack.Primary')}
        seconds={timeToFullPack.primary}
        {...props}
      />
      <PokemonTimeToFullPackSingle
        title={<ProducingStateIcon state="sleep2Filled" alt={t2('Secondary.Filled')}/>}
        alt={t('Stats.TimeToFullPack.Secondary')}
        seconds={timeToFullPack.secondary}
        {...props}
      />
    </Flex>
  );
};
