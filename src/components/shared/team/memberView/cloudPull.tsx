import React from 'react';

import CloudArrowDownIcon from '@heroicons/react/24/outline/CloudArrowDownIcon';

import {InputBox} from '@/components/input/box';
import {Flex} from '@/components/layout/flex/common';
import {FlexForm} from '@/components/layout/flex/form';
import {TeamMemberCloudPullProps} from '@/components/shared/team/memberView/type';
import {UserActionStatusIcon} from '@/components/shared/userData/statusIcon';
import {useUserDataActor} from '@/hooks/userData/actor/main';
import {TeamMemberData} from '@/types/game/team/member';
import {Nullable} from '@/utils/type';


type Props<TMember extends Nullable<TeamMemberData>> = TeamMemberCloudPullProps<TMember> & {
  onCloudPulled: (member: TMember) => void,
};

export const TeamMemberCloudPull = <TMember extends Nullable<TeamMemberData>>({
  getTeamMemberFromCloud,
  onCloudPulled,
}: Props<TMember>) => {
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
          const member = await getTeamMemberFromCloud(identifier);
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
