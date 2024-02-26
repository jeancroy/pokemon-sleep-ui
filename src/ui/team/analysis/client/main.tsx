'use client';
import React from 'react';

import {UserDataLazyLoad} from '@/components/shared/userData/lazyLoad/main';
import {TeamAnalysisLoadedClient} from '@/ui/team/analysis/client/loaded';
import {TeamAnalysisServerDataProps} from '@/ui/team/analysis/type';
import {getPokemonMaxEvolutionCount} from '@/utils/game/pokemon/evolution/count';
import {toPokemonList} from '@/utils/game/pokemon/utils';


export const TeamAnalysisClient = (props: TeamAnalysisServerDataProps) => {
  const {pokedexMap} = props;

  const pokemonList = toPokemonList(pokedexMap);
  const maxEvolutionCount = getPokemonMaxEvolutionCount(pokemonList);

  return (
    <UserDataLazyLoad
      options={{type: 'teamAnalysis'}}
      loadingText="Team"
      content={({data, session, actorReturn}) => (
        <TeamAnalysisLoadedClient
          data={data?.teamAnalysis}
          pokemonList={pokemonList}
          maxEvolutionCount={maxEvolutionCount}
          session={session}
          actorReturn={actorReturn}
          {...props}
        />
      )}
    />
  );
};
