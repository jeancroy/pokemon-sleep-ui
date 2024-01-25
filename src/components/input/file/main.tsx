import React from 'react';

import DocumentArrowUpIcon from '@heroicons/react/24/outline/DocumentArrowUpIcon';
import {clsx} from 'clsx';

import {InputFileCommonProps} from '@/components/input/file/type';
import {MimeTypes} from '@/types/mime';


type Props = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'id' | 'accept' | 'type' | 'onChange'
> & InputFileCommonProps & {
  accept: MimeTypes[],
  onFileTypeIncorrect: (fileType: string) => void,
};

export const InputFile = ({id, accept, onFileSelected, onFileTypeIncorrect, ...props}: Props) => {
  const {className} = props;
  const [filePath, setFilePath] = React.useState<string | null>(null);

  // `<label>` cannot go first per tailwindcss doc:
  // https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-sibling-state
  return (
    <>
      <input
        {...props}
        id={id}
        accept={accept.join(',')}
        type="file"
        className="peer hidden"
        onChange={({target}) => {
          const files = target.files;

          if (!files) {
            onFileSelected(null);
            return;
          }

          const file = files.item(0);
          if (!file) {
            return;
          }

          if (!accept.includes(file.type as MimeTypes)) {
            onFileTypeIncorrect(file.type);
            return;
          }

          setFilePath(file.name);
          onFileSelected(URL.createObjectURL(file));
        }}
      />
      <label htmlFor={id} className={clsx(
        'button-clickable-bg peer-disabled:button-disabled',
        'flex w-full cursor-pointer flex-row items-center self-stretch overflow-auto p-1.5',
        className,
      )}>
        <DocumentArrowUpIcon className="size-6 shrink-0"/>
        <div className="truncate">
          {filePath || '-'}
        </div>
      </label>
    </>
  );
};
