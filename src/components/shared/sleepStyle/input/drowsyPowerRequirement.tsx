import React from 'react';

import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {useFilterPremiumRestrictable} from '@/components/input/filter/common/premium/hook';
import {FilterPremiumRestrictableProps} from '@/components/input/filter/common/premium/type';
import {InputRow} from '@/components/input/filter/row';
import {Flex} from '@/components/layout/flex/common';
import {PremiumIcon} from '@/components/static/premium/icon';


type Props = FilterPremiumRestrictableProps & {
  drowsyPowerRequirement: number,
  setDrowsyPowerRequirement: (drowsyPowerRequirement: number) => void,
  step: number,
};

export const DrowsyPowerRequirementInput = ({
  drowsyPowerRequirement,
  setDrowsyPowerRequirement,
  step,
  ...props
}: Props) => {
  const t = useTranslations('UI.SleepStyle');

  const {isInputRestricted, isInputChangeRestricted} = useFilterPremiumRestrictable(props);

  return (
    <InputRow defaultAsCol className="md:flex-row">
      <Flex direction="row" noFullWidth center className="min-w-[8rem] items-center gap-1 px-2 text-sm">
        {isInputRestricted && <PremiumIcon/>}
        {t('DrowsyPowerRequirement')}
      </Flex>
      <InputBox
        value={drowsyPowerRequirement.toString()}
        type="number"
        className="w-32 text-center"
        step={step}
        onChange={({target}) => {
          if (isInputChangeRestricted()) {
            return;
          }

          const value = parseInt(target.value || '0');

          if (isNaN(value)) {
            return;
          }

          setDrowsyPowerRequirement(value);
        }}
      />
    </InputRow>
  );
};
