import React from 'react';

import {clsx} from 'clsx';

import {InputBox} from '@/components/input/box';
import {NumberInputLayout} from '@/components/shared/input/number/common/layout';
import {NumberInputLayoutProps} from '@/components/shared/input/number/common/type';
import {
  getNumberInputFormattedValue,
  getNumberInputParsedValue,
} from '@/components/shared/input/number/common/utils';
import {Nullable} from '@/utils/type';


export const NumberInputOptional = (props: NumberInputLayoutProps<Nullable<number>>) => {
  const {value, setValue, min, disabled} = props;

  return (
    <NumberInputLayout {...props}>
      <InputBox
        type="number"
        value={getNumberInputFormattedValue(props)}
        className={clsx(
          'w-12 text-center',
          value != null && min && value < min && 'text-danger',
          disabled && 'text-disabled',
        )}
        min={0}
        onChange={({target}) => setValue(getNumberInputParsedValue({
          valueString: target.value,
          isRequired: false,
          ...props,
        }))}
        disabled={disabled}
      />
    </NumberInputLayout>
  );
};
