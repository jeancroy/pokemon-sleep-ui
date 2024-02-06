import {clsx} from 'clsx';

import {textFilterButtonStyle} from '@/styles/input';


export const teamAnalysisCollapsibleControlStyle = clsx(
  // `ml-auto` for pushing the element to the right when wrapped
  'button-common-full button-hoverable button-bg ml-auto items-center gap-0.5 !rounded-full',
  textFilterButtonStyle,
);
