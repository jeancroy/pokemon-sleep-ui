import React from 'react';

import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {CookingConfigBrief} from '@/components/shared/cooking/config/brief';
import {StaminaSkillRecoveryBrief} from '@/components/shared/stamina/config/brief';
import {teamUserConfigSourceI18nId} from '@/components/shared/team/setupControl/config/const';
import {MealMap} from '@/types/game/meal/main';
import {TeamConfigSource} from '@/types/game/team/team';
import {ConfigBundle} from '@/types/userData/config/bundle';


type Props = {
  bundle: ConfigBundle,
  mealMap: MealMap,
  configSource: TeamConfigSource,
  isManualSkillRecoveryHidden?: boolean,
};

export const TeamUserConfigButton = ({bundle, mealMap, configSource, isManualSkillRecoveryHidden}: Props) => {
  const {cookingConfig, userConfig} = bundle;

  const t = useTranslations('UI.Component.Team.SetupControl.ConfigSource');

  return (
    <Flex center className="gap-1 md:flex-row md:gap-4">
      <Flex direction="row" center noFullWidth className="gap-0.5">
        <Cog6ToothIcon className="size-6 md:size-7"/>
        <span className="md:text-lg">
          {t(teamUserConfigSourceI18nId[configSource])}
        </span>
      </Flex>
      <Flex noFullWidth center className="text-sm">
        <StaminaSkillRecoveryBrief
          config={userConfig.stamina}
          isManualSkillRecoveryHidden={isManualSkillRecoveryHidden}
        />
        <CookingConfigBrief config={cookingConfig} mealMap={mealMap}/>
      </Flex>
    </Flex>
  );
};
