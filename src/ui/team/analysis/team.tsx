import React from 'react';

import merge from 'lodash/merge';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {useUpdateUserData} from '@/hooks/auth';
import {PokemonId, PokemonInfo} from '@/types/mongo/pokemon';
import {TeamAnalysis} from '@/ui/team/analysis/result/main';
import {TeamAnalysisSelectablePokemon} from '@/ui/team/analysis/selectable';
import {TeamAnalysisDataProps, TeamAnalysisFilter, TeamAnalysisTeamSetup} from '@/ui/team/analysis/type';


type Props = TeamAnalysisDataProps & {
  pokemon: PokemonInfo[],
  pokemonSelectableInclusionMap: FilterInclusionMap<PokemonId>,
  snorlaxFavorite: TeamAnalysisFilter['snorlaxFavorite'],
};

export const TeamAnalysisUI = (props: Props) => {
  const {pokemonSelectableInclusionMap, pokemon, session} = props;

  const [setup, setSetup] = React.useState<TeamAnalysisTeamSetup>(merge({
    team: {
      A: null,
      B: null,
      C: null,
      D: null,
      E: null,
    },
    bonus: {
      overall: 0,
      ingredient: 12,
    },
  }, session?.user.data.teamAnalysisSetup));
  useUpdateUserData({type: 'teamAnalysisSetup', data: setup});

  return (
    <>
      <div className="h-80 overflow-y-scroll md:h-60 lg:h-40">
        <TeamAnalysisSelectablePokemon
          setSetup={setSetup}
          isIncluded={pokemonSelectableInclusionMap}
          pokemon={pokemon}
        />
      </div>
      <HorizontalSplitter/>
      <TeamAnalysis setup={setup} setSetup={setSetup} {...props}/>
    </>
  );
};
