import React from 'react';

import {InputRow} from '@/components/input/filter/row';
import {Flex} from '@/components/layout/flex/common';
import {UserDataUploadButton} from '@/components/shared/userData/upload';
import {TeamAnalysisSetupInput} from '@/ui/team/analysis/setup/control/setup/input/main';
import {TeamAnalysisSetupInputCommonProps} from '@/ui/team/analysis/setup/control/setup/input/type';
import {TeamAnalysisLayoutControlUI} from '@/ui/team/analysis/setup/control/setup/layoutControl/main';
import {TeamAnalysisLayoutControl} from '@/ui/team/analysis/setup/control/setup/layoutControl/type';
import {TeamAnalysisQuickActionGlobalLevel} from '@/ui/team/analysis/setup/control/setup/quickAction/globalLevel';
import {TeamAnalysisQuickActionSyncAllPokemon} from '@/ui/team/analysis/setup/control/setup/quickAction/syncAll';


type Props = TeamAnalysisSetupInputCommonProps & {
  layoutControl: TeamAnalysisLayoutControl,
};

export const TeamAnalysisSetupControlUI = ({layoutControl, ...props}: Props) => {
  const {setupControl} = props;
  const {setup} = setupControl;

  return (
    <Flex className="gap-1">
      <TeamAnalysisSetupInput {...props}/>
      <TeamAnalysisQuickActionGlobalLevel {...props}/>
      <InputRow className="justify-end gap-1">
        <TeamAnalysisQuickActionSyncAllPokemon {...props}/>
        <TeamAnalysisLayoutControlUI layoutControl={layoutControl}/>
        <UserDataUploadButton
          opts={{
            type: 'teamAnalysis',
            data: {
              config: setup.config,
              comps: Object.values(setup.comps),
            },
          }}
        />
      </InputRow>
    </Flex>
  );
};
