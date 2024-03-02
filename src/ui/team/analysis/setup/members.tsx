import React from 'react';

import {TeamMemberView} from '@/components/shared/team/memberView/main';
import {TeamMemberFilledCommonProps} from '@/components/shared/team/memberView/type';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {CalculatedCookingConfig} from '@/types/userData/config/cooking/main';
import {
  TeamAnalysisComp,
  TeamAnalysisConfig,
  TeamAnalysisMember,
  TeamAnalysisSetup,
  TeamAnalysisSlotName,
  teamAnalysisSlotName,
  TeamProduction,
} from '@/types/website/feature/teamAnalysis';
import {getTeamCompCalcResult} from '@/ui/team/analysis/calc/comp';
import {stateOfRateToShow} from '@/ui/team/analysis/setup/const';
import {TeamAnalysisSetupViewCommonProps} from '@/ui/team/analysis/setup/type';
import {toTeamMemberDataFromVanilla, toTeamMemberFromPokeInBox} from '@/utils/team/toMember';
import {getTeamMemberId} from '@/utils/user/teamAnalysis';


type Props = TeamAnalysisSetupViewCommonProps & TeamMemberFilledCommonProps & {
  statsOfTeam: TeamProduction,
  calculatedCookingConfig: CalculatedCookingConfig,
};

export const TeamAnalysisMemberView = ({
  statsOfTeam,
  ...props
}: Props) => {
  const {
    setupControl,
  } = props;
  const {setup, currentTeam, actorReturn} = setupControl;
  const {actAsync} = actorReturn;

  const serverData = useCommonServerData();
  const {ingredientChainMap} = serverData;

  return (
    // Need to explicitly type or there will be some typing error
    <TeamMemberView<
        TeamAnalysisSlotName,
        TeamAnalysisMember,
        TeamAnalysisConfig,
        TeamAnalysisComp,
        TeamAnalysisSetup
      >
      getRateByLevel={(level, memberKey) => getTeamCompCalcResult({
        period: currentTeam.analysisPeriod,
        state: stateOfRateToShow,
        overrideLevel: level,
        setup,
        currentTeam,
        ...props,
        ...serverData,
      }).bySlot[memberKey]}
      memberKeys={[...teamAnalysisSlotName]}
      getMemberProduction={(memberKey) => statsOfTeam.bySlot[memberKey] ?? null}
      getMemberFromVanilla={(pokemon) => toTeamMemberDataFromVanilla({
        pokemon,
        chain: ingredientChainMap[pokemon.ingredientChain],
      })}
      getMemberFromPokeInBox={toTeamMemberFromPokeInBox}
      getMemberIdForShare={(currentTeam, slotName) => getTeamMemberId({
        uuid: currentTeam.uuid,
        slotName,
      })}
      getTeamMemberFromCloud={async (teamMemberId) => {
        if (!actAsync) {
          return null;
        }

        const {updated} = await actAsync({
          action: 'load',
          options: {
            type: 'teamAnalysisMember',
            opts: {teamMemberId},
          },
          getStatusOnCompleted: (updated) => (
            !!updated?.user.lazyLoaded.teamAnalysisMember ? 'completed' : 'failed'
          ),
        });

        return updated?.user.lazyLoaded.teamAnalysisMember ?? null;
      }}
      actorReturn={actorReturn}
      {...props}
    />
  );
};
