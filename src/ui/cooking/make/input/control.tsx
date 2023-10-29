import React from 'react';

import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';
import {useTranslations} from 'next-intl';

import {InputRow} from '@/components/input/filter/row';
import {getTextFilterButtonClass} from '@/components/input/filter/utils/props';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {GenericIcon} from '@/components/shared/icon/common/main';
import {UserDataUploadButton} from '@/components/shared/userData/upload';
import {MealMakerCommonProps} from '@/ui/cooking/make/type';
import {toCookingPreset} from '@/ui/cooking/make/utils';


export const MealMakerInputControl = ({filter, setFilter, preloaded}: MealMakerCommonProps) => {
  const {showUnmakeableRecipe} = filter;

  const t = useTranslations('UI.InPage.Cooking');

  return (
    <InputRow>
      <Flex direction="row" className="justify-end gap-2">
        <ToggleButton
          id="makeableRecipe"
          active={showUnmakeableRecipe}
          onClick={() => setFilter((original) => ({
            ...original,
            showUnmakeableRecipe: !showUnmakeableRecipe,
          }))}
          className={getTextFilterButtonClass(showUnmakeableRecipe)}
        >
          <Flex direction="row" noFullWidth className="gap-1">
            <div className="h-5 w-5">
              {showUnmakeableRecipe ? <EyeIcon/> : <EyeSlashIcon/>}
            </div>
            <GenericIcon
              src="/images/generic/ingredient_slash.png"
              alt={t('ToggleUnmakeable')}
              dimension="h-5 w-5"
              noInvert
              isActive={showUnmakeableRecipe}
            />
          </Flex>
        </ToggleButton>
        <UserDataUploadButton opts={{
          type: 'cooking',
          data: toCookingPreset({preloaded, filter}),
        }}/>
      </Flex>
    </InputRow>
  );
};