import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {useFilterPremiumRestrictable} from '@/components/input/filter/common/premium/hook';
import {FilterPremiumRestrictableProps} from '@/components/input/filter/common/premium/type';
import {FilterTextInput} from '@/components/input/filter/preset/text';
import {Flex} from '@/components/layout/flex/common';
import {PremiumIcon} from '@/components/static/premium/icon';
import {defaultDrowsyPowerMultiplier} from '@/const/game/event';
import {iconFilterButtonStyle} from '@/styles/input';
import {generateNumberTicks} from '@/utils/number/generator';


type Props = FilterPremiumRestrictableProps & {
  multiplier: number,
  setMultiplier: (multiplier: number) => void,
  maxMultiplier: number,
};

export const DrowsyPowerMultiplierInput = ({
  multiplier,
  setMultiplier,
  maxMultiplier,
  ...props
}: Props) => {
  const t = useTranslations('UI.Multiplier');

  const {isInputRestricted, isInputChangeRestricted} = useFilterPremiumRestrictable(props);

  return (
    <FilterTextInput
      title={
        <Flex direction="row" center className="items-center gap-1 px-2">
          {isInputRestricted && <PremiumIcon/>}
          <div>{t('DrowsyPower')}</div>
        </Flex>
      }
      ids={[...generateNumberTicks({
        max: maxMultiplier,
        interval: 50,
        start: defaultDrowsyPowerMultiplier,
      })]}
      idToText={(multiplier) => multiplier.toString()}
      onClick={(value) => {
        if (isInputChangeRestricted()) {
          return;
        }

        setMultiplier(value);
      }}
      isActive={(current) => current === multiplier}
      className={clsx(iconFilterButtonStyle, 'text-sm')}
      noFixedTitleWidth
    />
  );
};
