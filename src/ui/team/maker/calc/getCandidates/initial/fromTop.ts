import {TeamMakerCandidateData} from '@/ui/team/maker/type/common';


export type GetTeamMakerCandidateMapFromTopListOpts = {
  topWorst: TeamMakerCandidateData[],
  topBest: TeamMakerCandidateData[],
};

export const getTeamMakerCandidateMapFromTopList = ({
  topWorst,
  topBest,
}: GetTeamMakerCandidateMapFromTopListOpts): Map<string, TeamMakerCandidateData> => {
  const candidateMap = new Map<string, TeamMakerCandidateData>();
  for (const {payload} of [...topWorst, ...topBest]) {
    candidateMap.set(payload.refData.pokeInBox.uuid, {payload});
  }
  return candidateMap;
};
