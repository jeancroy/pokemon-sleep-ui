import React from 'react';

import {useTranslations} from 'next-intl';

import {InputRow} from '@/components/input/filter/row';
import {ToggleButton} from '@/components/input/toggleButton';
import {textFilterButtonStyle} from '@/styles/input';
import {UserCalculationBehavior} from '@/types/userData/settings/behavior';


type Props = {
  behavior: UserCalculationBehavior,
  setBehavior: (updated: UserCalculationBehavior) => void,
};

export const UserCalculationBehaviorUI = ({behavior, setBehavior}: Props) => {
  const {
    alwaysFullPack,
    goodCampTicket,
    includeMainSkill,
  } = behavior;

  const t = useTranslations('UI.UserSettings');

  const isAlwaysFullPack = alwaysFullPack === 'berryOnly';

  return (
    <InputRow>
      <ToggleButton
        active={isAlwaysFullPack}
        onClick={() => setBehavior({
          ...behavior,
          alwaysFullPack: !isAlwaysFullPack ? 'berryOnly' : 'disable',
        })}
        className={textFilterButtonStyle}
      >
        {t('BerryPokemonFullPack')}
      </ToggleButton>
      <ToggleButton
        active={goodCampTicket}
        onClick={() => setBehavior({
          ...behavior,
          goodCampTicket: !goodCampTicket,
        })}
        className={textFilterButtonStyle}
      >
        {t('GoodCampTicket')}
      </ToggleButton>
      <ToggleButton
        active={includeMainSkill}
        onClick={() => setBehavior({
          ...behavior,
          includeMainSkill: !includeMainSkill,
        })}
        className={textFilterButtonStyle}
      >
        {t('IncludeMainSkill')}
      </ToggleButton>
    </InputRow>
  );
};
