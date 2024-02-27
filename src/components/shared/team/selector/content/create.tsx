import React from 'react';

import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import {v4} from 'uuid';

import {InputBox} from '@/components/input/box';
import {Flex} from '@/components/layout/flex/common';
import {TeamSelectorContentCommonProps} from '@/components/shared/team/selector/content/type';
import {TeamSetupConfig} from '@/types/game/team/config';
import {TeamMemberData, TeamMemberKey} from '@/types/game/team/member';
import {TeamSetup} from '@/types/game/team/setup';
import {TeamData} from '@/types/game/team/team';
import {getTeamName} from '@/utils/game/team/name';
import {Nullable} from '@/utils/type';


export const TeamCreateButton = <
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
>({
  onAdded,
  generateNewTeam,
}: React.PropsWithChildren<TeamSelectorContentCommonProps<TKey, TMember, TConfig, TTeam, TSetup>>) => {
  const [newTeam, setNewTeam] = React.useState(generateNewTeam(v4()));

  return (
    <Flex center className="border-common rounded-lg border">
      <Flex direction="row" className="p-2">
        <InputBox
          type="text"
          value={newTeam.name}
          placeholder={getTeamName(newTeam)}
          className="w-full"
          onChange={({target}) => setNewTeam((original) => ({
            ...original,
            name: target.value,
          }))}
        />
      </Flex>
      <button className="button-clickable w-full p-2" onClick={() => {
        onAdded(newTeam);
        setNewTeam(generateNewTeam(v4()));
      }}>
        <PlusCircleIcon className="m-auto size-12"/>
      </button>
    </Flex>
  );
};
