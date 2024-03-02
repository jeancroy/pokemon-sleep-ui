'use client';
import React from 'react';

import {useTeamSetupControl} from '@/components/shared/team/setupControl/hook';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {teamAnalysisSlotName} from '@/types/website/feature/teamAnalysis';
import {TeamAnalysisSetupView} from '@/ui/team/analysis/setup/main';
import {TeamAnalysisSetupControl} from '@/ui/team/analysis/setup/type';
import {getInitialTeamAnalysisSetup} from '@/ui/team/analysis/setup/utils';
import {TeamAnalysisServerDataProps} from '@/ui/team/analysis/type';
import {getPokemonMaxEvolutionCount} from '@/utils/game/pokemon/evolution/count';
import {toPokemonList} from '@/utils/game/pokemon/utils';


export const TeamAnalysisClient = (props: TeamAnalysisServerDataProps) => {
  const {preloaded} = props;

  const serverData = useCommonServerData();
  const {serverConfigBundle, pokedexMap} = serverData;

  const setupControl: TeamAnalysisSetupControl = useTeamSetupControl({
    initialMigratedSetup: getInitialTeamAnalysisSetup({
      data: preloaded.setup,
      bundle: serverConfigBundle,
    }),
    getDuplicatedMember: ({members}, source) => {
      for (const slotName of teamAnalysisSlotName) {
        if (!!members[slotName]) {
          continue;
        }

        return {key: slotName, member: source};
      }

      return null;
    },
    getLayoutCollapsibleIndexKeys: () => [...teamAnalysisSlotName],
    ...props,
    ...serverData,
  });

  const pokemonList = toPokemonList(pokedexMap);

  return (
    <TeamAnalysisSetupView
      setupControl={setupControl}
      pokemonList={pokemonList}
      maxEvolutionCount={getPokemonMaxEvolutionCount(pokemonList)}
      {...props}
    />
  );
};
