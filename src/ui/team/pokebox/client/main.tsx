'use client';
import React from 'react';

import {UserDataLazyLoadPokeboxSorted} from '@/components/shared/userData/lazyLoad/pokeboxSorted';
import {PokeboxLoadedClient} from '@/ui/team/pokebox/client/loaded';
import {PokeboxServerDataProps} from '@/ui/team/pokebox/type';


export const PokeboxClient = (props: PokeboxServerDataProps) => {
  return (
    <UserDataLazyLoadPokeboxSorted
      render={(pokeInBoxList) => <PokeboxLoadedClient pokeInBoxList={pokeInBoxList} {...props}/>}
    />
  );
};
