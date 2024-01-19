import React from 'react';

import {useCollapsible} from '@/components/layout/collapsible/hook';


export type CollapsibleState = ReturnType<typeof useCollapsible>;

export type CollapsibleCommonProps = {
  state: CollapsibleState,
  button: React.ReactNode,
  appear?: boolean,
  noButtonPadding?: boolean,
  disabled?: boolean,
};
