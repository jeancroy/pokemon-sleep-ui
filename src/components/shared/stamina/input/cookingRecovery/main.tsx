import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {PotIcon} from '@/components/shared/icon/pot';
import {staminaConfigSectionStyling} from '@/components/shared/stamina/input/const';
import {StaminaConfigTimeInput} from '@/components/shared/stamina/input/time';
import {StaminaConfigProps} from '@/components/shared/stamina/input/type';
import {mealOfDayIcon} from '@/const/game/cooking';
import {cookingMeals} from '@/types/userData/config/cooking/meal';


export const StaminaConfigCookingRecovery = ({config, setConfig}: StaminaConfigProps) => {
  const {cookingRecovery} = config;

  const t = useTranslations('UI.Stamina');
  const title = t('CookingRecovery.Name');

  return (
    <Flex className={staminaConfigSectionStyling}>
      <Flex direction="row" className="gap-1">
        <PotIcon alt={title} dimension="size-6" noShrink/>
        <span>{title}</span>
      </Flex>
      <Flex className="items-center gap-1.5 lg:flex-row">
        {cookingMeals.map((cookingMeal) => (
          <StaminaConfigTimeInput
            key={cookingMeal}
            timeValue={cookingRecovery[cookingMeal]}
            onUpdate={(time) => setConfig({
              ...config,
              cookingRecovery: {
                ...config.cookingRecovery,
                [cookingMeal]: time,
              },
            })}
            icon={
              <div className="size-7 shrink-0">
                {mealOfDayIcon[cookingMeal]}
              </div>
            }
          />
        ))}
      </Flex>
    </Flex>
  );
};
