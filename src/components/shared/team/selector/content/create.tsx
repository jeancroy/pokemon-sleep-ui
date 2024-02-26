import React from 'react';

import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import {v4} from 'uuid';

import {InputBox} from '@/components/input/box';
import {Flex} from '@/components/layout/flex/common';
import {TeamSelectorContentCommonProps} from '@/components/shared/team/selector/content/type';
import {TeamConfig} from '@/types/game/team';
import {getTeamName} from '@/utils/game/team/name';


export const TeamCreateButton = <TTeam extends TeamConfig>({
  onAdded,
  generateNewTeam,
}: React.PropsWithChildren<TeamSelectorContentCommonProps<TTeam>>) => {
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
