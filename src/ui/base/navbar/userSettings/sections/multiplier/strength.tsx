import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterToggleButtons} from '@/components/input/filter/common/button';
import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {Flex} from '@/components/layout/flex/common';
import {EnergyIcon} from '@/components/shared/icon/energy';
import {NumberInputRequired} from '@/components/shared/input/number/required/main';
import {strengthMultiplierBehaviorI18nId, strengthMultiplierTypeI18nId} from '@/const/user/multiplier';
import {textFilterButtonStyle} from '@/styles/input';
import {StrengthMultiplierType} from '@/types/game/bonus/strength';
import {userStrengthMultiplierApplyBehavior} from '@/types/userData/settings/multiplier';
import {UserSettingsMultiplierCommonProps} from '@/ui/base/navbar/userSettings/sections/multiplier/type';
import {formatFloat} from '@/utils/number/format/regular';
import {cloneMerge} from '@/utils/object/cloneMerge';
import {getCurrentEventStrengthMultiplier} from '@/utils/user/settings/eventStrengthMultiplier';


type Props = UserSettingsMultiplierCommonProps & {
  type: StrengthMultiplierType,
};

export const UserSettingsStrengthMultiplierUI = ({
  eventStrengthMultiplierData,
  type,
  settings,
  setSettings,
}: Props) => {
  const {multiplier} = settings;
  const current = multiplier.strength[type];

  const t = useTranslations('UI.UserSettings.Multiplier');

  const currentMultiplier = getCurrentEventStrengthMultiplier({
    type,
    eventStrengthMultiplierData,
  });

  return (
    <InputRowWithTitle
      title={
        <Flex direction="row" center>
          <span>{t(strengthMultiplierTypeI18nId[type])}</span>
          <EnergyIcon alt={t('Strength.Name')}/>
        </Flex>
      }
    >
      <Flex>
        <FilterToggleButtons
          className={textFilterButtonStyle}
          ids={[...userStrengthMultiplierApplyBehavior]}
          idToButton={(behavior) => (
            t(strengthMultiplierBehaviorI18nId[behavior], {multiplier: formatFloat(currentMultiplier)})
          )}
          isActive={(behavior) => current.behavior === behavior}
          onClick={(behavior) => setSettings((original) => cloneMerge(
            original,
            {multiplier: {strength: {[type]: {behavior}}}},
          ))}
        />
        <AnimatedCollapseQuick show={current.behavior === 'custom'}>
          <NumberInputRequired
            text={null}
            value={current.value}
            valueType="float"
            min={1}
            step={0.1}
            disabled={current.behavior !== 'custom'}
            setValue={(value) => setSettings((original) => cloneMerge(
              original,
              {multiplier: {strength: {[type]: {value}}}},
            ))}
            className="mt-1"
          />
        </AnimatedCollapseQuick>
      </Flex>
    </InputRowWithTitle>
  );
};
