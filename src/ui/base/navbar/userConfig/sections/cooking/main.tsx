import React from 'react';

import {useTranslations} from 'next-intl';

import {CookingConfigUI} from '@/components/shared/cooking/config/main';
import {CookingConfigUiCommonProps} from '@/components/shared/cooking/config/type';
import {GenericIngredientIcon} from '@/components/shared/icon/ingredient';
import {UserConfigSection} from '@/ui/base/navbar/userConfig/sections/base';


export const UserConfigCooking = (props: CookingConfigUiCommonProps) => {
  const t = useTranslations('UI.UserConfig');

  return (
    <UserConfigSection
      titleIcon={<GenericIngredientIcon alt={t('Cooking.Title')} dimension="size-7"/>}
      title={t('Section.Cooking')}
    >
      <CookingConfigUI {...props}/>
    </UserConfigSection>
  );
};
