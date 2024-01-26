import React from 'react';

import {NextLink} from '@/components/shared/common/link/main';
import {PokemonBerryIconContent} from '@/components/shared/pokemon/berry/iconContent';
import {BerryIconCommonProps} from '@/components/shared/pokemon/berry/type';


export const PokemonBerryIcon = (props: BerryIconCommonProps) => {
  const {id, noLink} = props;

  if (noLink) {
    return <PokemonBerryIconContent {...props} id={id}/>;
  }

  return (
    // `tabIndex` -1 to avoid tab selecting
    <NextLink href={`/berry/${id}`} tabIndex={-1} target="_blank" className="button-clickable">
      <PokemonBerryIconContent {...props} id={id}/>
    </NextLink>
  );
};
