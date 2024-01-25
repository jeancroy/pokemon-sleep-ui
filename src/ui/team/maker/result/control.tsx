import React from 'react';

import ArrowTopRightOnSquareIcon from '@heroicons/react/24/outline/ArrowTopRightOnSquareIcon';
import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {FlexButton} from '@/components/layout/flex/button';
import {FlexForm} from '@/components/layout/flex/form';
import {PopupCommon} from '@/components/popup/common/main';
import {ClickableIconButton} from '@/components/shared/common/button/clickable';
import {UserActionStatusIcon} from '@/components/shared/userData/statusIcon';
import {useUserDataActor} from '@/hooks/userData/actor/main';
import {PokeInBox} from '@/types/userData/pokebox/main';


type Props = {
  pokeInBoxList: PokeInBox[],
};

export const TeamMakerCompControl = ({pokeInBoxList}: Props) => {
  const t = useTranslations('UI.InPage.Team.Maker.Control');
  const [show, setShow] = React.useState(false);
  const [teamName, setTeamName] = React.useState('');
  const {actAsync, status} = useUserDataActor();

  if (!actAsync) {
    return null;
  }

  return (
    <>
      <PopupCommon show={show} setShow={setShow}>
        <FlexForm className="w-96 items-end gap-1.5" onSubmit={async () => {
          const {status} = await actAsync({
            action: 'upload',
            options: {
              type: 'team.maker.export',
              data: {
                name: teamName,
                // No need to migrate as it is done server-side
                members: pokeInBoxList,
              },
            },
          });

          if (status === 'completed') {
            setShow(false);
          }
        }}>
          <InputRowWithTitle title={t('ExportTeamName')}>
            <InputBox
              type="text"
              value={teamName}
              className="w-full"
              onChange={({target}) => setTeamName(target.value)}
            />
          </InputRowWithTitle>
          <ClickableIconButton isSubmit disabled={status !== 'waiting'}>
            <UserActionStatusIcon
              status={status}
              onWaitingOverride={<ArrowTopRightOnSquareIcon className="size-6"/>}
            />
          </ClickableIconButton>
        </FlexForm>
      </PopupCommon>
      <FlexButton
        className="button-clickable-bg items-center justify-center gap-1 self-stretch px-2 py-1"
        disabled={status !== 'waiting'}
        onClick={() => setShow(true)}
      >
        <ArrowTopRightOnSquareIcon className="size-6"/>
        {t('ExportToTeamAnalysis')}
      </FlexButton>
    </>
  );
};
