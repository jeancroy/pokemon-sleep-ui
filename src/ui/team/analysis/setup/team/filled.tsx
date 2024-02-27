import React from 'react';

import {TeamMember} from '@/components/shared/team/member/main';
import {TeamAnalysisSlotName} from '@/types/teamAnalysis';
import {getTeamCompCalcResult} from '@/ui/team/analysis/calc/comp';
import {stateOfRateToShow} from '@/ui/team/analysis/setup/const';
import {TeamAnalysisFilledSlotProps} from '@/ui/team/analysis/setup/team/type';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';
import {getTeamMemberId} from '@/utils/user/teamAnalysis';


type Props = TeamAnalysisDataProps & TeamAnalysisFilledSlotProps & {
  onMemberClear: (slotName: TeamAnalysisSlotName) => void,
};

export const TeamAnalysisFilledSlot = ({collapsible, onMemberClear, ...props}: Props) => {
  const {
    setupControl,
    stats,
    currentTeam,
    slotName,
  } = props;
  const {setup, setCurrentMemberPartial, duplicateMemberToCurrentComp} = setupControl;

  return (
    <TeamMember
      teamMetadata={currentTeam}
      memberIdForShare={getTeamMemberId({uuid: currentTeam.uuid, slotName})}
      pinnedStats={['total']}
      rate={stats}
      stateOfRate={stateOfRateToShow}
      collapsible={collapsible}
      setMember={(update) => setCurrentMemberPartial({key: slotName, update})}
      getRateByLevel={(level) => getTeamCompCalcResult({
        period: currentTeam.analysisPeriod,
        state: stateOfRateToShow,
        overrideLevel: level,
        snorlaxFavorite: currentTeam.snorlaxFavorite,
        setup,
        ...props,
      }).bySlot[slotName]}
      onDuplicateClick={() => duplicateMemberToCurrentComp(slotName)}
      classOfButton="sm:flex-col 3xl:flex-row"
      {...props}
    />
  );
};
