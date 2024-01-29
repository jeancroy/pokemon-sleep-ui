import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {TeamAnalysisSetup} from '@/types/teamAnalysis';
import {UserSettingsBundle} from '@/types/userData/settings';
import {getInitialTeamAnalysisSetup} from '@/ui/team/analysis/client/utils';
import {TeamAnalysisSetupView} from '@/ui/team/analysis/setup/main';
import {TeamAnalysisCompDependentInput} from '@/ui/team/analysis/setup/team/input';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';
import {getCurrentTeam} from '@/ui/team/analysis/utils';
import {toPokemonList} from '@/utils/game/pokemon/utils';
import {DeepPartial} from '@/utils/type';


type Props = TeamAnalysisDataProps & {
  bundleFromClient: DeepPartial<UserSettingsBundle> | undefined,
};

export const TeamAnalysisLoadedClient = (props: Props) => {
  const {
    pokedexMap,
    data,
  } = props;
  const pokemonList = toPokemonList(pokedexMap);

  const initialSetup = getInitialTeamAnalysisSetup({data});
  const [setup, setSetup] = React.useState<TeamAnalysisSetup>(initialSetup);
  const currentTeam = getCurrentTeam({setup});

  return (
    <>
      <AdsUnit/>
      <TeamAnalysisCompDependentInput
        pokemonList={pokemonList}
        currentTeam={currentTeam}
        setSetup={setSetup}
        {...props}
      />
      <AdsUnit hideIfNotBlocked/>
      <TeamAnalysisSetupView
        setup={setup}
        setSetup={setSetup}
        currentTeam={currentTeam}
        {...props}
      />
    </>
  );
};
