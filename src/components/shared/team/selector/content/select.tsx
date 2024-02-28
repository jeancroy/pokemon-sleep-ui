import React from 'react';

import {XMarkIcon} from '@heroicons/react/24/outline';
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {DeleteButton} from '@/components/shared/common/button/delete';
import {IconWithInfo} from '@/components/shared/common/image/iconWithInfo';
import {UnavailableIcon} from '@/components/shared/common/unavailable';
import {maxTeamSelectorPreviewMemberCount} from '@/components/shared/team/selector/const';
import {TeamSelectorContentCommonProps} from '@/components/shared/team/selector/content/type';
import {imageIconSizes} from '@/styles/image';
import {TeamSetupConfig} from '@/types/game/team/config';
import {TeamMemberData, TeamMemberKey} from '@/types/game/team/member';
import {TeamSetup} from '@/types/game/team/setup';
import {TeamData} from '@/types/game/team/team';
import {getTeamName} from '@/utils/game/team/name';
import {Nullable} from '@/utils/type';


type Props<
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
> = TeamSelectorContentCommonProps<TKey, TMember, TConfig, TTeam, TSetup> & {
  team: TTeam,
};

export const TeamSelectButton = <
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
>({
  setupControl,
  getMemberList,
  onUpdated,
  onDeleted,
  onCopied,
  onPicked,
  team,
}: Props<TKey, TMember, TConfig, TTeam, TSetup>) => {
  const {current} = setupControl.setup.config;

  const t = useTranslations('Game');

  const isCurrent = current === team.uuid;
  const memberList = getMemberList(team);

  return (
    <AnimatedCollapseQuick key={team.uuid} show appear className="border-common rounded-lg border">
      <Flex center className={clsx(
        'h-full',
        isCurrent && 'button-bg',
      )}>
        <Flex direction="row" className="gap-2 p-2">
          <InputBox
            type="text"
            value={team.name}
            placeholder={getTeamName(team)}
            className="w-full"
            onChange={({target}) => onUpdated({...team, name: target.value})}
          />
          <button className="button-clickable-bg size-7 shrink-0 rounded-lg p-1" onClick={() => onCopied(team.uuid)}>
            <DocumentDuplicateIcon/>
          </button>
          {
            current !== team.uuid &&
            <DeleteButton dimension="size-7" onClick={() => onDeleted(team.uuid)}/>
          }
        </Flex>
        <FlexButton
          noFullWidth={false}
          disabled={isCurrent}
          center
          onClick={() => onPicked(team.uuid)}
          className="enabled:button-clickable gap-1.5 p-2"
        >
          {memberList.length ?
            // Limit member count to show on preview to avoid too many members cramming the preview
            memberList.slice(0, maxTeamSelectorPreviewMemberCount).map((member, idx) => (
              member ?
                <IconWithInfo
                  key={idx}
                  imageSrc={`/images/pokemon/icons/${member.pokemonId}.png`}
                  imageAlt={member.name || t(`PokemonName.${member.pokemonId}`)}
                  imageDimension="size-12"
                  imageSizes={imageIconSizes}
                  info={member.level}
                /> :
                <UnavailableIcon key={idx}/>
            )) :
            <XMarkIcon className="size-12"/>}
        </FlexButton>
      </Flex>
    </AnimatedCollapseQuick>
  );
};
