import {NumberInputValueCommonProps, NumberInputValueType} from '@/components/shared/input/number/common/type';
import {formatFloat} from '@/utils/number/format';
import {Nullable} from '@/utils/type';


export const getNumberInputFormattedValue = <TValue extends Nullable<number>>({
  value,
  valueType,
}: NumberInputValueCommonProps<TValue>): string => {
  if (value == null) {
    return '';
  }

  if (valueType === undefined || valueType === 'integer') {
    return value.toString();
  }

  if (valueType === 'float') {
    return formatFloat(value);
  }

  throw new Error(
    `Unhandled value type [${valueType satisfies never}] for number input of value [${value}]`,
  );
};

type GetNumberInputParsedValueOpts = {
  valueString: string,
  isRequired: boolean,
  valueType?: NumberInputValueType,
  min?: number,
  max?: number,
};

export const getNumberInputParsedValue = ({
  valueString,
  valueType,
  isRequired,
  min,
  max,
}: GetNumberInputParsedValueOpts): number | null => {
  let value;
  if (valueType === undefined || valueType === 'integer') {
    value = parseInt(valueString);
  } else if (valueType === 'float') {
    value = parseFloat(valueString);
  } else {
    throw new Error(`Unhandled value type [${valueType satisfies never}] for parsing number input value`);
  }

  if (isNaN(value)) {
    return isRequired ? 0 : null;
  }

  return Math.max(min ?? -Infinity, Math.min(max ?? Infinity, value));
};
