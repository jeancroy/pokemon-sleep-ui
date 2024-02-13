import React from 'react';

import {TeamMemberData} from '@/types/game/team';
import {TeamAnalysisSetup, TeamAnalysisSlotName} from '@/types/teamAnalysis';


export type TeamAnalysisSetMemberOpts = {
  slotName: TeamAnalysisSlotName,
  member: TeamMemberData | null,
};

export type TeamAnalysisSetMemberReplaceAllOpts = {
  update: Partial<TeamMemberData>,
};

export type TeamAnalysisSetMemberFromPartialOpts = {
  slotName: TeamAnalysisSlotName,
  update: Partial<TeamMemberData> | null,
};

export type TeamAnalysisSetupControl = {
  setup: TeamAnalysisSetup,
  setSetup: React.Dispatch<React.SetStateAction<TeamAnalysisSetup>>,
  setCurrentMember: (opts: TeamAnalysisSetMemberOpts) => void,
  setCurrentMemberReplaceAll: (opts: TeamAnalysisSetMemberReplaceAllOpts) => void,
  setCurrentMemberPartial: (opts: TeamAnalysisSetMemberFromPartialOpts) => void,
  duplicateMemberToCurrentComp: (sourceSlot: TeamAnalysisSlotName) => void,
};
