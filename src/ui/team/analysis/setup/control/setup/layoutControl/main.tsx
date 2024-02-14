import React from 'react';

import ArrowsPointingInIcon from '@heroicons/react/24/outline/ArrowsPointingInIcon';
import ArrowsPointingOutIcon from '@heroicons/react/24/outline/ArrowsPointingOutIcon';
import {useTranslations} from 'next-intl';

import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {teamAnalysisSetupActionButtonStyle} from '@/ui/team/analysis/setup/control/setup/const';
import {TeamAnalysisLayoutControl} from '@/ui/team/analysis/setup/control/setup/layoutControl/type';


type Props = {
  layoutControl: TeamAnalysisLayoutControl,
};

export const TeamAnalysisLayoutControlUI = ({layoutControl}: Props) => {
  const {setAllCollapsible} = layoutControl;

  const t = useTranslations('UI.Component.Collapsible');

  return (
    <Flex direction="row" noFullWidth wrap className="gap-1">
      <FlexButton className={teamAnalysisSetupActionButtonStyle} onClick={() => setAllCollapsible(true)}>
        <ArrowsPointingOutIcon className="size-5"/>
        <span>{t('ExpandAll')}</span>
      </FlexButton>
      <FlexButton className={teamAnalysisSetupActionButtonStyle} onClick={() => setAllCollapsible(false)}>
        <ArrowsPointingInIcon className="size-5"/>
        <span>{t('CollapseAll')}</span>
      </FlexButton>
    </Flex>
  );
};
