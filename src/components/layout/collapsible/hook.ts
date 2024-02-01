import React from 'react';

import {CollapsibleControl} from '@/components/layout/collapsible/type';


export const useCollapsibleControl = (defaultShow: boolean = false): CollapsibleControl => {
  const [show, setShow] = React.useState(defaultShow);

  return {show, setShow};
};
