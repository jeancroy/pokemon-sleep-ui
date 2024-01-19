import {clsx} from 'clsx';

import {Nullable} from '@/utils/type';


export const getCollapsibleButtonStyle = (buttonNoPadding: Nullable<boolean>) => clsx(
  'button-clickable-bg disabled:button-disabled group relative',
  !buttonNoPadding && 'p-1',
);
