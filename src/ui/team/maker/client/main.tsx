'use client';
import React from 'react';

import {UserDataLazyLoadPokeboxSorted} from '@/components/shared/userData/lazyLoad/pokeboxSorted';
import {TeamMakerLoadedClient} from '@/ui/team/maker/client/loaded';
import {TeamMakerServerDataProps} from '@/ui/team/maker/type';
import {getMaxRecipeLevel} from '@/utils/game/meal/recipeLevel';


export const TeamMakerClient = (props: TeamMakerServerDataProps) => {
  const {recipeLevelData} = props;

  const maxRecipeLevel = getMaxRecipeLevel({recipeLevelData});

  return (
    <UserDataLazyLoadPokeboxSorted
      render={(pokeInBoxList) => (
        <TeamMakerLoadedClient
          pokeboxList={pokeInBoxList}
          maxRecipeLevel={maxRecipeLevel}
          {...props}
        />
      )}
    />
  );
};
