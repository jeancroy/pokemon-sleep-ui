import React from 'react';

import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InputRow} from '@/components/input/filter/row';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {EnergyIcon} from '@/components/shared/icon/energy';
import {UserDataUploadButton} from '@/components/shared/userData/upload';
import {textFilterButtonStyle} from '@/styles/input';
import {UserCookingPreset} from '@/types/userData/cooking';


type Props = {
  showEnergy: boolean,
  setShowEnergy: (updated: boolean) => void,
  uploadData: UserCookingPreset,
};

export const MealDisplayControl = ({showEnergy, setShowEnergy, uploadData}: Props) => {
  const t = useTranslations('UI.InPage.Cooking');

  return (
    <InputRow className="justify-end gap-2">
      <ToggleButton
        active={showEnergy}
        onClick={() => setShowEnergy(!showEnergy)}
        className={clsx('group', textFilterButtonStyle)}
      >
        <Flex direction="row" center noFullWidth className="gap-1">
          <div className="size-5">
            {showEnergy ? <EyeIcon/> : <EyeSlashIcon/>}
          </div>
          <EnergyIcon alt={t('Energy')} noInvert isActive={showEnergy}/>
        </Flex>
      </ToggleButton>
      <UserDataUploadButton opts={{type: 'cooking', data: uploadData}}/>
    </InputRow>
  );
};
