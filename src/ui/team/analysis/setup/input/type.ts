import {FilterInclusionMap} from '@/components/input/filter/type';
import {CollapsibleControl} from '@/components/layout/collapsible/type';
import {TeamAnalysisSlotName} from '@/types/teamAnalysis';


export type TeamAnalysisCompCollapsible = FilterInclusionMap<TeamAnalysisSlotName>;

export type TeamAnalysisSetupCollapsible = {[teamUuid in string]?: TeamAnalysisCompCollapsible};

export type TeamAnalysisSetupInput = {
  showCollapsible: TeamAnalysisSetupCollapsible,
};

export type TeamAnalysisSetupInputControl = {
  generateSlotCollapsibleControl: (teamUuid: string, slotName: TeamAnalysisSlotName) => CollapsibleControl,
  setAllCollapsible: (show: boolean) => void,
};
