import {UseUserDataActorReturn} from '@/hooks/userData/actor/type';
import {TeamAnalysisComp} from '@/types/teamAnalysis';
import {TeamAnalysisSetupControl} from '@/ui/team/analysis/setup/control/setup/type';


export type TeamAnalysisSetupUpdateCommonProps = {
  actorReturn: UseUserDataActorReturn,
  setupControl: TeamAnalysisSetupControl,
  currentTeam: TeamAnalysisComp,
};
