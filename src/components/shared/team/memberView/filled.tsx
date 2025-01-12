import React from 'react';

import {TeamMember} from '@/components/shared/team/member/main';
import {TeamMemberFilledSlotProps} from '@/components/shared/team/memberView/type';
import {TeamSetupConfig} from '@/types/game/team/config';
import {TeamMemberData, TeamMemberKey} from '@/types/game/team/member';
import {TeamSetup} from '@/types/game/team/setup';
import {TeamData} from '@/types/game/team/team';
import {stateOfRateToShow} from '@/ui/team/analysis/setup/const';
import {Nullable} from '@/utils/type';


type Props<
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
> = TeamMemberFilledSlotProps<TKey, TMember, TConfig, TTeam, TSetup> & {
  memberIdForShare: string,
};

export const TeamMemberFilledSlot = <
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
>({
  getRateByLevel,
  ...props
}: Props<TKey, TMember, TConfig, TTeam, TSetup>) => {
  const {
    setupControl,
    stats,
    memberKey,
  } = props;
  const {currentTeam, setCurrentMemberPartial, duplicateMemberToCurrentComp} = setupControl;

  return (
    <TeamMember
      teamMetadata={currentTeam}
      production={stats}
      stateOfRate={stateOfRateToShow}
      setMember={(update) => setCurrentMemberPartial({
        key: memberKey,
        update,
      })}
      onDuplicateClick={() => duplicateMemberToCurrentComp(memberKey)}
      classOfButton="sm:flex-col 3xl:flex-row"
      getProductionByLevel={(level) => getRateByLevel(level, memberKey)}
      {...props}
    />
  );
};
