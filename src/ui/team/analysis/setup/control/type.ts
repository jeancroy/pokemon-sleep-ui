import {TeamSetupControl} from '@/components/shared/team/setupControl/type';
import {UseUserDataActorReturn} from '@/hooks/userData/actor/type';
import {
  TeamAnalysisComp,
  TeamAnalysisConfig,
  TeamAnalysisMember,
  TeamAnalysisSetup,
  TeamAnalysisSlotName,
} from '@/types/teamAnalysis';


export type TeamAnalysisSetupControl = TeamSetupControl<
  TeamAnalysisSlotName,
  TeamAnalysisMember,
  TeamAnalysisConfig,
  TeamAnalysisComp,
  TeamAnalysisSetup
>;

// FIXME: Remove
export type TeamAnalysisSetupUpdateCommonProps = {
  actorReturn: UseUserDataActorReturn,
  setupControl: TeamAnalysisSetupControl,
  currentTeam: TeamAnalysisComp,
};
