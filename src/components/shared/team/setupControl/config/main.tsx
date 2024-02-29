import React from 'react';


import {AdsUnit} from '@/components/ads/main';
import {CollapsibleFull} from '@/components/layout/collapsible/full';
import {useCollapsibleControl} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex/common';
import {CookingConfigUI} from '@/components/shared/cooking/config/main';
import {CookingConfigUiCommonProps} from '@/components/shared/cooking/config/type';
import {StaminaConfig} from '@/components/shared/stamina/input/main';
import {StaminaConfigProps} from '@/components/shared/stamina/input/type';
import {TeamUserConfigButton} from '@/components/shared/team/setupControl/config/button';
import {TeamUserConfigPremiumUserOnly} from '@/components/shared/team/setupControl/config/premiumOnly';
import {noOp} from '@/const/noOp';


type Props = StaminaConfigProps & CookingConfigUiCommonProps & {
  isPremium: boolean,
};

export const TeamUserConfig = ({
  isPremium,
  setStaminaConfig,
  setCookingConfig,
  setStaminaSkillTrigger,
  ...props
}: Props) => {
  const {bundle, mealMap, hideManualSkillRecovery} = props;

  const collapsible = useCollapsibleControl();

  return (
    <CollapsibleFull control={collapsible} button={
      <TeamUserConfigButton
        bundle={bundle}
        mealMap={mealMap}
        isManualSkillRecoveryHidden={hideManualSkillRecovery}
      />
    }>
      <Flex className="gap-1">
        {!isPremium && <TeamUserConfigPremiumUserOnly/>}
        <StaminaConfig
          setStaminaConfig={isPremium ? setStaminaConfig : noOp}
          setStaminaSkillTrigger={isPremium ? setStaminaSkillTrigger : noOp}
          {...props}
        />
        <CookingConfigUI
          setCookingConfig={isPremium ? setCookingConfig : noOp}
          {...props}
        />
        <AdsUnit/>
      </Flex>
    </CollapsibleFull>
  );
};
