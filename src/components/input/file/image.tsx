import React from 'react';

import DocumentCheckIcon from '@heroicons/react/24/outline/DocumentCheckIcon';
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon';

import {InputFile} from '@/components/input/file/main';
import {InputFileCommonProps} from '@/components/input/file/type';
import {Flex} from '@/components/layout/flex/common';
import {mimeTypesOfImage} from '@/types/mime';
import {showToast} from '@/utils/toast';


export const InputFileImageOnly = (props: InputFileCommonProps) => {
  return (
    <InputFile
      {...props}
      accept={[...mimeTypesOfImage]}
      onFileTypeIncorrect={(fileType) => showToast({
        isAlert: true,
        content: (
          <Flex direction="row" className="items-center gap-1">
            <ExclamationTriangleIcon className="size-6"/>
            <div>
              {fileType || '(N/A)'}
            </div>
            <DocumentCheckIcon className="size-6"/>
            <div>
              {mimeTypesOfImage.join(' / ')}
            </div>
          </Flex>
        ),
      })}
    />
  );
};
