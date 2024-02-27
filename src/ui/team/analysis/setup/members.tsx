import React from 'react';

import {TeamMemberView} from '@/components/shared/team/memberView/main';
import {TeamMemberFilledCommonProps} from '@/components/shared/team/memberView/type';
import {TeamLayoutControl} from '@/components/shared/team/setupControl/layoutControl/type';
import {
  TeamAnalysisComp,
  TeamAnalysisConfig,
  TeamAnalysisMember,
  TeamAnalysisSetup,
  TeamAnalysisSlotName,
  teamAnalysisSlotName, TeamProduction,
} from '@/types/teamAnalysis';
import {CalculatedCookingConfig} from '@/types/userData/config/cooking/main';
import {getTeamCompCalcResult} from '@/ui/team/analysis/calc/comp';
import {stateOfRateToShow} from '@/ui/team/analysis/setup/const';
import {TeamAnalysisMemberViewCommonProps} from '@/ui/team/analysis/setup/type';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';
import {toTeamMemberDataFromVanilla, toTeamMemberFromPokeInBox} from '@/utils/team/toMember';
import {getTeamMemberId} from '@/utils/user/teamAnalysis';


type Props = TeamAnalysisDataProps & TeamAnalysisMemberViewCommonProps & TeamMemberFilledCommonProps & {
  layoutControl: TeamLayoutControl<TeamAnalysisSlotName>,
  statsOfTeam: TeamProduction,
  calculatedCookingConfig: CalculatedCookingConfig,
};

export const TeamAnalysisMemberView = ({
  layoutControl,
  statsOfTeam,
  ...props
}: Props) => {
  const {
    currentTeam,
    setupControl,
    ingredientChainMap,
    actorReturn,
  } = props;
  const {actAsync} = actorReturn;
  const {setup} = setupControl;

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
        snorlaxFavorite: currentTeam.snorlaxFavorite,
        setup,
        ...props,
      }).bySlot[memberKey]}
      memberKeys={[...teamAnalysisSlotName]}
      getMemberProduction={(memberKey) => statsOfTeam.bySlot[memberKey]}
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
      {...props}
    />
  );
};
