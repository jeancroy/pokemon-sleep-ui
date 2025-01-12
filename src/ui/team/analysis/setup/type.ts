import {TeamSetupControl} from '@/components/shared/team/setupControl/type';
import {
  TeamAnalysisComp,
  TeamAnalysisConfig,
  TeamAnalysisMember,
  TeamAnalysisSetup,
  TeamAnalysisSlotName,
} from '@/types/website/feature/teamAnalysis';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';


export type TeamAnalysisSetupControl = TeamSetupControl<
  TeamAnalysisSlotName,
  TeamAnalysisMember,
  TeamAnalysisConfig,
  TeamAnalysisComp,
  TeamAnalysisSetup
>;

export type TeamAnalysisSetupViewCommonProps = TeamAnalysisDataProps & {
  setupControl: TeamAnalysisSetupControl,
};
