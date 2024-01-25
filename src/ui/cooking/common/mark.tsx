import React from 'react';

import BookmarkIcon from '@heroicons/react/24/outline/BookmarkIcon';
import {clsx} from 'clsx';


import {getToggleButtonClass} from '@/styles/input';


type Props = {
  marked: boolean,
  setMarked: (updated: boolean) => void,
};

export const CookingMarkButton = ({marked, setMarked}: Props) => {
  return (
    <button onClick={() => setMarked(!marked)} className={clsx(
      'size-5 shrink-0 rounded-lg p-1', getToggleButtonClass(marked),
    )}>
      <BookmarkIcon/>
    </button>
  );
};
