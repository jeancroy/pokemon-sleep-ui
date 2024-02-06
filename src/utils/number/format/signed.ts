import {FormatNumberOpts, formatter} from '@/utils/number/format/regular';
import {isNotNullish} from '@/utils/type';


export const formatSignedNumber = ({format, num}: FormatNumberOpts): string | null => {
  if (!isNotNullish(num) || isNaN(num)) {
    return null;
  }

  return `${num > 0 ? '+' : ''}${formatter[format].format(num)}`;
};
