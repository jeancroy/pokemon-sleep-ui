import React from 'react';

import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InputRow} from '@/components/input/filter/row';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {StrengthIcon} from '@/components/shared/icon/strength';
import {UserDataUploadButton} from '@/components/shared/userData/upload';
import {textFilterButtonStyle} from '@/styles/input';
import {toCookingConfigFromMealPreparerFilter} from '@/ui/cooking/prepare/input/utils';
import {MealPreparerCommonProps} from '@/ui/cooking/prepare/type';


export const MealPreparerControl = ({filter, setFilter, preloaded}: MealPreparerCommonProps) => {
  const {showRecipeStrength} = filter;

  const t = useTranslations('UI.InPage.Cooking');

  return (
    <InputRow className="justify-end">
      <ToggleButton
        active={showRecipeStrength}
        onClick={() => setFilter(({showRecipeStrength, ...original}) => ({
          ...original,
          showRecipeStrength: !showRecipeStrength,
        }))}
        className={clsx('group', textFilterButtonStyle)}
      >
        <Flex direction="row" center noFullWidth className="gap-1">
          <div className="size-5">
            {showRecipeStrength ? <EyeIcon/> : <EyeSlashIcon/>}
          </div>
          <StrengthIcon alt={t('Energy')} noInvert isActive={showRecipeStrength}/>
        </Flex>
      </ToggleButton>
      <UserDataUploadButton opts={{
        type: 'config.cooking',
        data: toCookingConfigFromMealPreparerFilter({preloaded, filter}),
      }}/>
    </InputRow>
  );
};
