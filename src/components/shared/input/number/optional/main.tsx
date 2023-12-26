import React from 'react';

import {clsx} from 'clsx';

import {InputBox} from '@/components/input/box';
import {NumberInputLayout} from '@/components/shared/input/number/common/layout';
import {NumberInputLayoutProps} from '@/components/shared/input/number/common/type';
import {Nullable} from '@/utils/type';


export const NumberInputOptional = (props: NumberInputLayoutProps<Nullable<number>>) => {
  const {value, setValue, formatValue, min, disabled} = props;

  return (
    <NumberInputLayout {...props}>
      <InputBox
        type="number"
        value={value != null ? (formatValue ? formatValue(value) : value.toString()) : ''}
        className={clsx(
          'w-12 text-center',
          value != null && min && value < min && 'text-danger',
          disabled && 'text-disabled',
        )}
        min={0}
        onChange={({target}) => {
          const value = parseInt(target.value);

          setValue(isNaN(value) ? null : (min ? Math.max(min, value) : value));
        }}
        disabled={disabled}
      />
    </NumberInputLayout>
  );
};
