import React from 'react';

import {TeamMemberDataProps} from '@/components/shared/team/member/type';
import {FieldMetaMap} from '@/types/game/mapMeta';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {SnorlaxDataOfMap} from '@/types/game/snorlax';
import {TeamAnalysisComp, TeamAnalysisSetup} from '@/types/teamAnalysis';
import {UserLazyLoadedData} from '@/types/userData/main';
import {UserSettingsBundle} from '@/types/userData/settings';


export type TeamAnalysisServerDataProps = Omit<TeamMemberDataProps, 'maxEvolutionCount'> & {
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  snorlaxData: SnorlaxDataOfMap[],
  mapMeta: FieldMetaMap,
  preloaded: UserSettingsBundle,
};

export type TeamAnalysisDataProps = TeamAnalysisServerDataProps & {
  data: UserLazyLoadedData['teamAnalysis'],
  maxEvolutionCount: number,
};

export type TeamAnalysisSetupModifyingProps = {
  setup: TeamAnalysisSetup,
  setSetup: React.Dispatch<React.SetStateAction<TeamAnalysisSetup>>,
  currentTeam: TeamAnalysisComp,
};
