import {teamAnalysisSlotName, TeamAnalysisSlotName, TeamMemberIdData} from '@/types/website/feature/teamAnalysis';


export const isTeamAnalysisSlotName = (type: string): type is TeamAnalysisSlotName => {
  return teamAnalysisSlotName.includes(type as TeamAnalysisSlotName);
};

export const getTeamMemberId = ({uuid, slotName}: TeamMemberIdData): string => {
  return `${uuid}/${slotName}`;
};

export const extractTeamMemberId = (id: string): TeamMemberIdData | null => {
  if (!id.includes('/')) {
    return null;
  }

  const [uuid, slotName] = id.split('/', 2);

  if (!isTeamAnalysisSlotName(slotName)) {
    return null;
  }

  return {uuid, slotName};
};
