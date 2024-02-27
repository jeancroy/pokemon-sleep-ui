'use client';
import React from 'react';

import {useTeamSetupControl} from '@/components/shared/team/setupControl/hook';
import {useUserDataActor} from '@/hooks/userData/actor/main';
import {TeamAnalysisComp, teamAnalysisSlotName} from '@/types/teamAnalysis';
import {TeamAnalysisSetupView} from '@/ui/team/analysis/setup/main';
import {getInitialTeamAnalysisSetup} from '@/ui/team/analysis/setup/utils';
import {TeamAnalysisServerDataProps} from '@/ui/team/analysis/type';
import {getPokemonMaxEvolutionCount} from '@/utils/game/pokemon/evolution/count';
import {toPokemonList} from '@/utils/game/pokemon/utils';
import {getCurrentTeam} from '@/utils/team/setup/getCurrentTeam';


export const TeamAnalysisClient = (props: TeamAnalysisServerDataProps) => {
  const {preloaded, pokedexMap} = props;

  const actorReturn = useUserDataActor();
  const setupControl = useTeamSetupControl({
    initialMigratedSetup: getInitialTeamAnalysisSetup({data: preloaded.setup}),
    getNextKeyForDuplicate: ({members}) => {
      for (const slotName of teamAnalysisSlotName) {
        if (!!members[slotName]) {
          continue;
        }

        return slotName;
      }

      return null;
    },
    getLayoutCollapsibleIndexKeys: () => [...teamAnalysisSlotName],
  });
  const {setup} = setupControl;

  const currentTeam: TeamAnalysisComp = getCurrentTeam({setup});
  const pokemonList = toPokemonList(pokedexMap);

  return (
    <TeamAnalysisSetupView
      actorReturn={actorReturn}
      setupControl={setupControl}
      currentTeam={currentTeam}
      pokemonList={pokemonList}
      maxEvolutionCount={getPokemonMaxEvolutionCount(pokemonList)}
      {...props}
    />
  );
};
