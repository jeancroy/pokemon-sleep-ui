import React from 'react';

import CloudArrowDownIcon from '@heroicons/react/24/outline/CloudArrowDownIcon';

import {InputBox} from '@/components/input/box';
import {Flex} from '@/components/layout/flex/common';
import {FlexForm} from '@/components/layout/flex/form';
import {TeamMemberCloudPullProps} from '@/components/shared/team/memberView/type';
import {UserActionStatusIcon} from '@/components/shared/userData/statusIcon';
import {useUserDataActor} from '@/hooks/userData/actor/main';
import {TeamMemberData, TeamMemberKey} from '@/types/game/team/member';
import {Nullable} from '@/utils/type';


type Props<
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>
> = TeamMemberCloudPullProps<TKey, TMember> & {
  memberKey: TKey,
  onCloudPulled: (member: TMember) => void,
};

export const TeamMemberCloudPull = <TKey extends TeamMemberKey, TMember extends Nullable<TeamMemberData>>({
  getTeamMemberFromCloud,
  memberKey,
  onCloudPulled,
}: Props<TKey, TMember>) => {
  const [identifier, setIdentifier] = React.useState('');
  const {actAsync, status} = useUserDataActor();

  if (!actAsync) {
    return null;
  }

  return (
    <FlexForm className="gap-1.5 sm:w-96">
      <Flex>
        <InputBox
          type="text"
          value={identifier}
          onChange={({target}) => setIdentifier(target.value)}
        />
      </Flex>
      <Flex className="items-end">
        <button type="submit" className="button-clickable-bg size-9 p-1" onClick={async () => {
          const member = await getTeamMemberFromCloud(identifier, memberKey);
          if (!member) {
            return;
          }

          onCloudPulled(member);
        }}>
          <UserActionStatusIcon status={status} onWaitingOverride={<CloudArrowDownIcon/>}/>
        </button>
      </Flex>
    </FlexForm>
  );
};
