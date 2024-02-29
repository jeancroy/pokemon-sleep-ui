import React from 'react';

import PencilIcon from '@heroicons/react/24/outline/PencilIcon';

import {FilterExpandedInput} from '@/components/input/filter/expanded/main';
import {docsEditorDisplayTypeIcon} from '@/components/shared/docs/editor/const';
import {docsEditorDisplayType, DocsEditorDisplayType} from '@/components/shared/docs/editor/type';


type Props = {
  display: DocsEditorDisplayType,
  setDisplay: (updated: DocsEditorDisplayType) => void,
};

export const DocsEditorDisplayToggle = ({display, setDisplay}: Props) => {
  return (
    <FilterExpandedInput
      onClick={(display) => setDisplay(display)}
      isActive={(current) => current === display}
      title={<PencilIcon className="size-6"/>}
      ids={[...docsEditorDisplayType]}
      idToButton={(display) => (
        <div className="size-6">
          {docsEditorDisplayTypeIcon[display]}
        </div>
      )}
    />
  );
};
