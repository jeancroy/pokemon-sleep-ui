import React from 'react';

import {InputRow} from '@/components/input/filter/row';
import {Flex} from '@/components/layout/flex/common';
import {TeamQuickActionGlobalLevel} from '@/components/shared/team/quickAction/globalLevel';
import {TeamQuickActionSyncPokemon} from '@/components/shared/team/quickAction/syncPokemon';
import {TeamQuickActionGlobalLevel} from '@/components/shared/team/setupControl/quickAction/globalLevel';
import {TeamQuickActionSyncPokemon} from '@/components/shared/team/setupControl/quickAction/syncPokemon';
import {UserDataUploadButton} from '@/components/shared/userData/upload';
import {TeamAnalysisSetupInput} from '@/ui/team/analysis/setup/control/setup/input/main';
import {TeamAnalysisSetupInputCommonProps} from '@/ui/team/analysis/setup/control/setup/input/type';
import {isNotNullish} from '@/utils/type';


type Props = TeamAnalysisSetupInputCommonProps & {
  layoutControl: TeamAnalysisLayoutControl,
};

export const TeamAnalysisSetupControlUI = ({layoutControl, ...props}: Props) => {
  const {currentTeam, setupControl} = props;
  const {
    setup,
    updatePokemonFromPokebox,
    setCurrentMemberReplaceAll,
  } = setupControl;

  return (
    <Flex className="gap-1">
      <TeamAnalysisSetupInput {...props}/>
      <TeamQuickActionGlobalLevel
        onLevelSelected={(level) => setCurrentMemberReplaceAll({update: {level}})
        }/>
      <InputRow className="justify-end gap-1">
        <TeamQuickActionSyncPokemon
          onPokeboxReceived={updatePokemonFromPokebox}
          linkedPokeInBoxUuidList={Object.values(currentTeam.members)
            .filter(isNotNullish)
            .map(({linkedPokeInBoxUuid}) => linkedPokeInBoxUuid)
            .filter(isNotNullish)}
          {...props}
        />
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
