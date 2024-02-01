import React from 'react';


export type CollapsibleControl = {
  show: boolean,
  setShow: (show: boolean) => void,
};

export type CollapsibleCommonProps = {
  control: CollapsibleControl,
  button: React.ReactNode,
  appear?: boolean,
  noButtonPadding?: boolean,
  disabled?: boolean,
};
