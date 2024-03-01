import React from 'react';

import CalendarDaysIcon from '@heroicons/react/24/outline/CalendarDaysIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {PokemonInfo} from '@/types/game/pokemon';
import {Dimension} from '@/types/style';
import {isPokemonEventOnly} from '@/utils/game/pokemon/event';


type Props = {
  pokemon: PokemonInfo,
  dimension?: Dimension,
};

export const PokemonEventOnlyIcon = ({pokemon, dimension}: Props) => {
  const t = useTranslations('UI.Pokemon.Info.Flags');

  if (!isPokemonEventOnly(pokemon)) {
    return null;
  }

  return (
    <CalendarDaysIcon
      className={clsx('text-event-pokemon shrink-0', dimension ?? 'size-6')}
      title={t('EventOnly')}
    />
  );
};
