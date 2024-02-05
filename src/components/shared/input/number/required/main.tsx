import React from 'react';

import {clsx} from 'clsx';

import {InputBox} from '@/components/input/box';
import {NumberInputLayout} from '@/components/shared/input/number/common/layout';
import {NumberInputLayoutProps} from '@/components/shared/input/number/common/type';
import {
  getNumberInputFormattedValue,
  getNumberInputParsedValue,
} from '@/components/shared/input/number/common/utils';


export const NumberInputRequired = ({
  min = 1,
  max = Infinity,
  ...props
}: NumberInputLayoutProps<number>) => {
  const {setValue, disabled} = props;

  return (
    <NumberInputLayout
      {...props}
      min={min}
      max={max}
      setValue={(value) => value != null && setValue(value)}
    >
      <InputBox
        value={getNumberInputFormattedValue(props)}
        type="number"
        className={clsx('w-12 text-center', disabled && 'text-disabled')}
        onChange={({target}) => {
          const value = getNumberInputParsedValue({
            valueString: target.value,
            isRequired: true,
            ...props,
          });

          if (value === null) {
            return;
          }

          setValue(value);
        }}
        disabled={disabled}
      />
    </NumberInputLayout>
  );
};
