import React from 'react';

import RectangleStackIcon from '@heroicons/react/24/outline/RectangleStackIcon';
import cloneDeep from 'lodash/cloneDeep';
import {v4} from 'uuid';

import {InputRow} from '@/components/input/filter/row';
import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {TeamSelectorContent} from '@/components/shared/team/selector/content/main';
import {TeamSelectorCommonProps} from '@/components/shared/team/selector/type';
import {getUpdatedTeamSetup} from '@/components/shared/team/selector/utils';
import {TeamConfig} from '@/types/game/team';
import {SessionStatus} from '@/types/session';
import {getDefaultTeamName, getTeamName} from '@/utils/game/team/name';


type Props<TTeam extends TeamConfig> = TeamSelectorCommonProps<TTeam> & {
  status: SessionStatus,
};

export const TeamSelector = <TTeam extends TeamConfig>({status, ...props}: Props<TTeam>) => {
  const {setup, setSetup} = props;
  const [show, setShow] = React.useState(false);

  const {current, teams} = setup;
  const currentTeam = teams[current];

  return (
    <InputRow className="justify-end gap-1.5">
      <PopupCommon show={show} setShow={setShow}>
        <TeamSelectorContent
          onPicked={(selected: string) => {
            setSetup({
              ...setup,
              current: selected,
            });
            setShow(false);
          }}
          onUpdated={(updated) => setSetup(getUpdatedTeamSetup({original: setup, team: updated}))}
          onDeleted={(deleted) => {
            const clonedSetup = {...setup};
            delete clonedSetup.teams[deleted];

            setSetup(clonedSetup);
          }}
          onAdded={(newTeam) => setSetup(getUpdatedTeamSetup({original: setup, team: newTeam}))}
          onCopied={(sourceUuid) => {
            const uuid = v4();
            const newTeam: TTeam = {
              ...cloneDeep(setup.teams[sourceUuid]),
              uuid,
              name: getDefaultTeamName(uuid),
            };

            setSetup(getUpdatedTeamSetup({original: setup, team: newTeam}));
          }}
          {...props}
        />
      </PopupCommon>
      <button
        className="enabled:button-clickable-bg disabled:button-disabled relative h-8 px-2"
        disabled={status !== 'authenticated'}
        onClick={() => setShow(true)}
      >
        <Flex direction="row" center className="gap-1.5">
          <RectangleStackIcon className="size-7"/>
          <div>
            {getTeamName(currentTeam)}
          </div>
        </Flex>
      </button>
    </InputRow>
  );
};
