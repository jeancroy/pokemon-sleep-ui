import React from 'react';

import ChevronDownIcon from '@heroicons/react/24/solid/ChevronDownIcon';
import ChevronUpIcon from '@heroicons/react/24/solid/ChevronUpIcon';
import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {NumberInputLayoutProps} from '@/components/shared/input/number/common/type';
import {changeButtonClass} from '@/components/shared/input/number/const';
import {Nullable} from '@/utils/type';


export const NumberInputLayout = ({
  text,
  value,
  setValue,
  onClickDefault,
  min,
  max,
  step,
  className,
  classOfText,
  disabled,
  children,
}: React.PropsWithChildren<Omit<NumberInputLayoutProps<Nullable<number>>, 'formatValue'>>) => {
  const inUseMin = min ?? -Infinity;
  const inUseMax = max ?? Infinity;
  const inUseStep = step ?? 1;

  const isValueNumber = typeof value === 'number';
  const isDefaultUnavailable = onClickDefault == null && !isValueNumber;

  return (
    <Flex direction="row" noFullWidth className={clsx('items-center gap-1.5', className)}>
      {
        text &&
        <div className={clsx('whitespace-nowrap text-sm', classOfText)}>
          {text}
        </div>
      }
      <button
        className={changeButtonClass}
        disabled={value === inUseMin || isDefaultUnavailable || disabled}
        onClick={() => setValue(isValueNumber ? Math.max(value - inUseStep, inUseMin) : (onClickDefault ?? value))}
        tabIndex={-1}
      >
        <ChevronDownIcon/>
      </button>
      {children}
      <button
        className={changeButtonClass}
        disabled={value === inUseMax || isDefaultUnavailable || disabled}
        onClick={() => setValue(isValueNumber ? Math.min(value + inUseStep, inUseMax) : (onClickDefault ?? value))}
        tabIndex={-1}
      >
        <ChevronUpIcon/>
      </button>
    </Flex>
  );
};
