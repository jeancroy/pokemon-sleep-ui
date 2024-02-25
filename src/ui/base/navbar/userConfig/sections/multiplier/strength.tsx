import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterToggleButtons} from '@/components/input/filter/common/button';
import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {Flex} from '@/components/layout/flex/common';
import {StrengthIcon} from '@/components/shared/icon/strength';
import {NumberInputRequired} from '@/components/shared/input/number/required/main';
import {strengthMultiplierTypeI18nId} from '@/const/game/multiplier';
import {strengthMultiplierBehaviorI18nId} from '@/const/user/multiplier';
import {textFilterButtonStyle} from '@/styles/input';
import {StrengthMultiplierType} from '@/types/game/bonus/strength';
import {userStrengthMultiplierApplyBehavior} from '@/types/userData/config/user/multiplier';
import {UserConfigMultiplierCommonProps} from '@/ui/base/navbar/userConfig/sections/multiplier/type';
import {getCurrentEventStrengthMultiplier} from '@/utils/game/event/strengthMultiplier';
import {formatFloat} from '@/utils/number/format/regular';
import {cloneMerge} from '@/utils/object/cloneMerge';


type Props = UserConfigMultiplierCommonProps & {
  type: StrengthMultiplierType,
};

export const UserConfigStrengthMultiplierUI = ({
  eventStrengthMultiplierData,
  type,
  config,
  setConfig,
}: Props) => {
  const {multiplier} = config;
  const current = multiplier.strength[type];

  const t = useTranslations('UI.Multiplier');
  const t2 = useTranslations('UI.UserConfig.Multiplier');

  const currentMultiplier = getCurrentEventStrengthMultiplier({
    type,
    eventStrengthMultiplierData,
  });

  return (
    <InputRowWithTitle
      title={
        <Flex direction="row" center>
          <span>{t(strengthMultiplierTypeI18nId[type])}</span>
          <StrengthIcon alt={t('Strength.Name')}/>
        </Flex>
      }
    >
      <Flex>
        <FilterToggleButtons
          className={textFilterButtonStyle}
          ids={[...userStrengthMultiplierApplyBehavior]}
          idToButton={(behavior) => (
            t2(strengthMultiplierBehaviorI18nId[behavior], {multiplier: formatFloat(currentMultiplier)})
          )}
          isActive={(behavior) => current.behavior === behavior}
          onClick={(behavior) => setConfig((original) => cloneMerge(
            original,
            {multiplier: {strength: {[type]: {behavior}}}},
          ))}
        />
        <AnimatedCollapseQuick
          show={current.behavior === 'custom'}
          className="justify-self-center sm:justify-self-auto"
        >
          <NumberInputRequired
            text={null}
            value={current.value}
            valueType="float"
            min={1}
            step={0.1}
            disabled={current.behavior !== 'custom'}
            setValue={(value) => setConfig((original) => cloneMerge(
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
