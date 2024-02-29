import React from 'react';

import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon';
import {useTranslations} from 'next-intl';

import {useFilterPremiumRestrictable} from '@/components/input/filter/common/premium/hook';
import {FilterTextInput} from '@/components/input/filter/preset/text';
import {getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex/common';
import {teamUserConfigSourceI18nId} from '@/components/shared/team/setupControl/config/const';
import {TeamSetupControl} from '@/components/shared/team/setupControl/type';
import {PremiumIcon} from '@/components/static/premium/icon';
import {TeamSetupConfig} from '@/types/game/team/config';
import {TeamMemberData, TeamMemberKey} from '@/types/game/team/member';
import {TeamSetup} from '@/types/game/team/setup';
import {teamConfigSource, TeamData} from '@/types/game/team/team';
import {Nullable} from '@/utils/type';


type Props<
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
> = {
  setupControl: TeamSetupControl<TKey, TMember, TConfig, TTeam, TSetup>,
};

export const TeamUserConfigSourceInput = <
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
>({
  setupControl,
}: Props<TKey, TMember, TConfig, TTeam, TSetup>) => {
  const {currentTeam, setCurrentTeam, actorReturn} = setupControl;

  const {isInputChangeRestricted, isPremium} = useFilterPremiumRestrictable({
    premiumOnly: true,
    session: actorReturn.session.data,
  });

  const t = useTranslations('UI.Component.Team.SetupControl.ConfigSource');

  return (
    <FilterTextInput
      title={
        <Flex direction="row" center className="gap-0.5">
          <PremiumIcon isPremium={isPremium}/>
          <Cog6ToothIcon className="size-6 shrink-0"/>
          <span>{t('Name')}</span>
        </Flex>
      }
      ids={[...teamConfigSource]}
      idToText={(source) => t(teamUserConfigSourceI18nId[source])}
      {...getSingleSelectOnClickProps({
        filter: currentTeam,
        setFilter: setCurrentTeam,
        filterKey: 'configSource',
        allowNull: false,
        isAllowed: () => !isInputChangeRestricted(),
      })}
    />
  );
};
