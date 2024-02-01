import React from 'react';


type Props = {
  show: boolean,
};

export const AdsGap = ({show}: Props) => {
  if (!show) {
    return null;
  }

  // This is for bumping the page height to allow the ads at the very bottom of the page to show
  return <div className="min-h-[10rem]"/>;
};
