import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {
  pokemonNameIconSize,
  pokemonNameIdStyling,
  pokemonNameWrapperStyling,
} from '@/components/shared/pokemon/name/const';
import {PokemonNameIcons} from '@/components/shared/pokemon/name/icons';
import {PokemonNameProps, PokemonNameSize} from '@/components/shared/pokemon/name/type';


type Props = PokemonNameProps & {
  size: PokemonNameSize,
};

export const PokemonName = ({pokemon, override, className, size}: Props) => {
  const {id} = pokemon;

  const t = useTranslations('Game');

  return (
    <Flex direction="row" noFullWidth center className={clsx(
      'truncate',
      pokemonNameWrapperStyling[size],
      className,
    )}>
      <PokemonNameIcons pokemon={pokemon} dimension={pokemonNameIconSize[size]}/>
      <div className="truncate">
        {override ?? t(`PokemonName.${id}`)}
      </div>
      <div className={clsx('self-end text-slate-500', pokemonNameIdStyling[size])}>
        #{id}
      </div>
    </Flex>
  );
};
