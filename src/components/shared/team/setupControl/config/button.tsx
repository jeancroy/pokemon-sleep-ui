import React from 'react';

import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon';

import {Flex} from '@/components/layout/flex/common';
import {CookingConfigBrief} from '@/components/shared/cooking/config/brief';
import {StaminaSkillRecoveryBrief} from '@/components/shared/stamina/config/brief';
import {MealMap} from '@/types/game/meal/main';
import {ConfigBundle} from '@/types/userData/config/bundle';


type Props = {
  bundle: ConfigBundle,
  mealMap: MealMap,
  isManualSkillRecoveryHidden?: boolean,
};

export const TeamUserConfigButton = ({bundle, mealMap, isManualSkillRecoveryHidden}: Props) => {
  const {cookingConfig, userConfig} = bundle;

  return (
    <Flex direction="row" center className="gap-1.5">
      <Cog6ToothIcon className="size-8"/>
      <Flex noFullWidth center className="gap-0.5 text-sm">
        <StaminaSkillRecoveryBrief
          config={userConfig.stamina}
          isManualSkillRecoveryHidden={isManualSkillRecoveryHidden}
        />
        <CookingConfigBrief config={cookingConfig} mealMap={mealMap}/>
      </Flex>
    </Flex>
  );
};
