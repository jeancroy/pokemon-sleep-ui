import React from 'react';

import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InputRow} from '@/components/input/filter/row';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {EnergyIcon} from '@/components/shared/icon/energy';
import {textFilterButtonStyle} from '@/styles/input';


type Props = {
  showStrength: boolean,
  setShowStrength: (updated: boolean) => void,
};

export const MealDisplayControl = ({showStrength, setShowStrength}: Props) => {
  const t = useTranslations('UI.InPage.Cooking');

  return (
    <InputRow className="justify-end gap-2">
      <ToggleButton
        active={showStrength}
        onClick={() => setShowStrength(!showStrength)}
        className={clsx('group', textFilterButtonStyle)}
      >
        <Flex direction="row" center noFullWidth className="gap-1">
          <div className="size-5">
            {showStrength ? <EyeIcon/> : <EyeSlashIcon/>}
          </div>
          <EnergyIcon alt={t('Energy')} noInvert isActive={showStrength}/>
        </Flex>
      </ToggleButton>
    </InputRow>
  );
};
