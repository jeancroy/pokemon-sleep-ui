import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {PokemonNameIcons} from '@/components/shared/pokemon/name/icons';
import {PokemonNameProps} from '@/components/shared/pokemon/name/type';


export const PokemonNameSimple = ({pokemon, override, className}: PokemonNameProps) => {
  const {id} = pokemon;

  const t = useTranslations('Game');

  return (
    <Flex direction="row" noFullWidth center className={clsx('gap-0.5', className)}>
      <PokemonNameIcons pokemon={pokemon} dimension="size-5"/>
      <div className="truncate">
        {override ?? t(`PokemonName.${id}`)}
      </div>
      <div className="self-end text-xs text-slate-500">
        #{id}
      </div>
    </Flex>
  );
};
