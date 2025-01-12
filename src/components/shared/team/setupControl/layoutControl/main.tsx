import React from 'react';

import ArrowsPointingInIcon from '@heroicons/react/24/outline/ArrowsPointingInIcon';
import ArrowsPointingOutIcon from '@heroicons/react/24/outline/ArrowsPointingOutIcon';
import {useTranslations} from 'next-intl';

import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {teamSetupControlButtonStyle} from '@/components/shared/team/setupControl/const';
import {TeamLayoutControl} from '@/components/shared/team/setupControl/layoutControl/type';
import {TeamMemberKey} from '@/types/game/team/member';


type Props<TKey extends TeamMemberKey> = {
  layoutControl: TeamLayoutControl<TKey>,
};

export const TeamLayoutControlUI = <TKey extends TeamMemberKey>({layoutControl}: Props<TKey>) => {
  const {setAllCollapsible} = layoutControl;

  const t = useTranslations('UI.Component.Collapsible');

  return (
    <Flex direction="row" noFullWidth wrap className="gap-1">
      <FlexButton className={teamSetupControlButtonStyle} onClick={() => setAllCollapsible(true)}>
        <ArrowsPointingOutIcon className="size-5"/>
        <span>{t('ExpandAll')}</span>
      </FlexButton>
      <FlexButton className={teamSetupControlButtonStyle} onClick={() => setAllCollapsible(false)}>
        <ArrowsPointingInIcon className="size-5"/>
        <span>{t('CollapseAll')}</span>
      </FlexButton>
    </Flex>
  );
};
