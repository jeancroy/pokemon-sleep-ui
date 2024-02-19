import React from 'react';

import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';
import {useTranslations} from 'next-intl';

import {InputRow} from '@/components/input/filter/row';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {GenericIngredientSlashIcon} from '@/components/shared/icon/ingredientSlash';
import {UserDataUploadButton} from '@/components/shared/userData/upload';
import {textFilterButtonStyle} from '@/styles/input';
import {MealMakerCommonProps} from '@/ui/cooking/make/type';
import {toCookingConfigFromMealMakerFilter} from '@/ui/cooking/make/utils';


export const MealMakerInputControl = ({filter, setFilter, preloaded}: MealMakerCommonProps) => {
  const {showUnmakeableRecipe} = filter;

  const t = useTranslations('UI.InPage.Cooking');

  return (
    <InputRow className="justify-end gap-2">
      <ToggleButton
        active={showUnmakeableRecipe}
        onClick={() => setFilter((original) => ({
          ...original,
          showUnmakeableRecipe: !showUnmakeableRecipe,
        }))}
        className={textFilterButtonStyle}
      >
        <Flex direction="row" noFullWidth className="gap-1">
          <div className="size-5">
            {showUnmakeableRecipe ? <EyeIcon/> : <EyeSlashIcon/>}
          </div>
          <GenericIngredientSlashIcon
            alt={t('ToggleUnmakeable')}
            dimension="size-5"
            noInvert
            isActive={showUnmakeableRecipe}
          />
        </Flex>
      </ToggleButton>
      <UserDataUploadButton
        opts={{
          type: 'config.cooking',
          data: toCookingConfigFromMealMakerFilter({preloaded, filter}),
        }}
      />
    </InputRow>
  );
};
