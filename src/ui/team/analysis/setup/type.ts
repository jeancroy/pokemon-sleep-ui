
import {TeamSetupControl} from '@/components/shared/team/setupControl/type';
import {UseUserDataActorReturn} from '@/hooks/userData/actor/type';
import {
  TeamAnalysisComp,
  TeamAnalysisConfig,
  TeamAnalysisMember,
  TeamAnalysisSetup,
  TeamAnalysisSlotName,
} from '@/types/teamAnalysis';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';


export type TeamAnalysisSetupControl = TeamSetupControl<
  TeamAnalysisSlotName,
  TeamAnalysisMember,
  TeamAnalysisConfig,
  TeamAnalysisComp,
  TeamAnalysisSetup
>;

export type TeamAnalysisSetupViewCommonProps = TeamAnalysisDataProps & {
  actorReturn: UseUserDataActorReturn,
  setupControl: TeamAnalysisSetupControl,
  currentTeam: TeamAnalysisComp,
};
