import {TeamMakerCandidateData, TeamMakerPokemonLimits} from '@/ui/team/maker/type/common';


export type TeamMakerCandidateInitialData = {
  candidates: Map<string, TeamMakerCandidateData>,
  isLimitCheckingNotNeeded: boolean,
};

export type TeamMakerFullMealCoverCandidateData = {
  memberCount: number,
  candidates: Map<string, TeamMakerPokemonLimits>,
};
