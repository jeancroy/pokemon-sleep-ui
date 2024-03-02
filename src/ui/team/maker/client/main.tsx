'use client';
import React from 'react';

import {UserDataLazyLoadPokeboxSorted} from '@/components/shared/userData/lazyLoad/pokeboxSorted';
import {TeamMakerLoadedClient} from '@/ui/team/maker/client/loaded';
import {TeamMakerServerDataProps} from '@/ui/team/maker/type';


export const TeamMakerClient = (props: TeamMakerServerDataProps) => {
  return (
    <UserDataLazyLoadPokeboxSorted
      render={(pokeInBoxList) => (
        <TeamMakerLoadedClient
          pokeboxList={pokeInBoxList}
          {...props}
        />
      )}
    />
  );
};
