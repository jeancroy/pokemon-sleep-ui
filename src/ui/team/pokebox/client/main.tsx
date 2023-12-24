'use client';
import React from 'react';

import {UserDataLazyLoad} from '@/components/shared/userData/lazyLoad/main';
import {PokeboxLoadedClient} from '@/ui/team/pokebox/client/loaded';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';


export const PokeboxClient = (props: PokeboxCommonProps) => {
  return (
    <UserDataLazyLoad
      options={{type: 'pokebox'}}
      loadingText="Pokebox"
      content={(data) => (
        <PokeboxLoadedClient initialPokebox={data?.pokebox ?? {}} {...props}/>
      )}
    />
  );
};
