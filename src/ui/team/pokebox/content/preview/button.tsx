import React from 'react';

import EyeIcon from '@heroicons/react/24/solid/EyeIcon';

import {FlexButton} from '@/components/layout/flex/button';


type Props = {
  message: string,
  onClick: () => void,
};

export const PokeboxPreviewButton = ({message, onClick}: Props) => {
  return (
    <FlexButton className="button-clickable-border info-highlight gap-1 p-1" onClick={onClick}>
      <EyeIcon className="size-6"/>
      <div className="whitespace-nowrap">
        {message}
      </div>
    </FlexButton>
  );
};
