import React from 'react';

import RectangleStackIcon from '@heroicons/react/24/outline/RectangleStackIcon';
import {clsx} from 'clsx';
import cloneDeep from 'lodash/cloneDeep';
import {v4} from 'uuid';

import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {TeamSelectorContent} from '@/components/shared/team/selector/content/main';
import {TeamSelectorCommonProps} from '@/components/shared/team/selector/type';
import {getUpdatedTeamSetup} from '@/components/shared/team/selector/utils';
import {TeamSetupConfig} from '@/types/game/team/config';
import {TeamMemberData, TeamMemberKey} from '@/types/game/team/member';
import {TeamSetup} from '@/types/game/team/setup';
import {TeamData} from '@/types/game/team/team';
import {SessionStatus} from '@/types/session';
import {getDefaultTeamName, getTeamName} from '@/utils/game/team/name';
import {Nullable} from '@/utils/type';


type Props<
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
> = TeamSelectorCommonProps<TKey, TMember, TConfig, TTeam, TSetup> & {
  status: SessionStatus,
  className?: string,
};

export const TeamSelector = <
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
>({status, className, ...props}: Props<TKey, TMember, TConfig, TTeam, TSetup>) => {
  const {setupControl} = props;
  const {setup, setSetup, currentTeam} = setupControl;

  const [show, setShow] = React.useState(false);

  return (
    <>
      <PopupCommon show={show} setShow={setShow}>
        <TeamSelectorContent
          onPicked={(current: string) => {
            setSetup({
              ...setup,
              config: {...setup.config, current},
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
      <button disabled={status !== 'authenticated'} onClick={() => setShow(true)} className={clsx(
        'enabled:button-clickable-bg disabled:button-disabled h-8 px-2',
        className,
      )}>
        <Flex direction="row" center className="gap-1.5">
          <RectangleStackIcon className="size-7"/>
          <span>{getTeamName(currentTeam)}</span>
        </Flex>
      </button>
    </>
  );
};
