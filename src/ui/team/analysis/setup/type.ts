import {useSession} from 'next-auth/react';

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

export type TeamAnalysisSetupViewCommonProps = {
  session: ReturnType<typeof useSession>,
  actorReturn: UseUserDataActorReturn,
};

export type TeamAnalysisMemberViewCommonProps = {
  actorReturn: UseUserDataActorReturn,
  setupControl: TeamAnalysisSetupControl,
  currentTeam: TeamAnalysisComp,
};
