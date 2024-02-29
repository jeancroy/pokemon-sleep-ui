import React from 'react';


import {AdsUnit} from '@/components/ads/main';
import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {CollapsibleFull} from '@/components/layout/collapsible/full';
import {useCollapsibleControl} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex/common';
import {CookingConfigUI} from '@/components/shared/cooking/config/main';
import {CookingConfigUiCommonProps} from '@/components/shared/cooking/config/type';
import {StaminaConfig} from '@/components/shared/stamina/input/main';
import {StaminaConfigProps} from '@/components/shared/stamina/input/type';
import {TeamUserConfigButton} from '@/components/shared/team/setupControl/config/button';
import {TeamUserConfigSourceInput} from '@/components/shared/team/setupControl/config/configSource';
import {TeamSetupControl} from '@/components/shared/team/setupControl/type';
import {noOp} from '@/const/noOp';
import {TeamSetupConfig} from '@/types/game/team/config';
import {TeamMemberData, TeamMemberKey} from '@/types/game/team/member';
import {TeamSetup} from '@/types/game/team/setup';
import {TeamData} from '@/types/game/team/team';
import {Nullable} from '@/utils/type';


type Props<
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
> = StaminaConfigProps & CookingConfigUiCommonProps & {
  setupControl: TeamSetupControl<TKey, TMember, TConfig, TTeam, TSetup>,
  isPremium: boolean,
};

export const TeamUserConfig = <
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
>({
  setStaminaConfig,
  setCookingConfig,
  setStaminaSkillTrigger,
  ...props
}: Props<TKey, TMember, TConfig, TTeam, TSetup>) => {
  const {
    bundle,
    setupControl,
    mealMap,
    hideManualSkillRecovery,
  } = props;
  const {currentTeam, isPremium} = setupControl;
  const {configSource} = currentTeam;

  const collapsible = useCollapsibleControl();

  return (
    <CollapsibleFull control={collapsible} button={
      <TeamUserConfigButton
        bundle={bundle}
        mealMap={mealMap}
        configSource={configSource}
        isManualSkillRecoveryHidden={hideManualSkillRecovery}
      />
    }>
      <Flex className="gap-1">
        <TeamUserConfigSourceInput setupControl={setupControl}/>
        <AnimatedCollapse show={isPremium && configSource === 'override'}>
          <StaminaConfig
            setStaminaConfig={isPremium ? setStaminaConfig : noOp}
            setStaminaSkillTrigger={isPremium ? setStaminaSkillTrigger : noOp}
            {...props}
          />
          <CookingConfigUI
            setCookingConfig={isPremium ? setCookingConfig : noOp}
            {...props}
          />
        </AnimatedCollapse>
        <AdsUnit/>
      </Flex>
    </CollapsibleFull>
  );
};
