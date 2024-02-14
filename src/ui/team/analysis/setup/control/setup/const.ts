import {clsx} from 'clsx';

import {textFilterButtonStyle} from '@/styles/input';


export const teamAnalysisSetupActionButtonStyle = clsx(
  // `ml-auto` for pushing the element to the right when wrapped
  'button-common-full enabled:button-hoverable enabled:button-bg disabled:button-disabled-theme',
  'ml-auto items-center gap-0.5',
  textFilterButtonStyle,
);
