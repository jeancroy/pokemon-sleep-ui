import React from 'react';

import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import ClipboardIcon from '@heroicons/react/24/outline/ClipboardIcon';
import {clsx} from 'clsx';

import {Dimension} from '@/types/style';


type Props = {
  data: string,
  dimension?: Dimension,
};

export const CopyButton = ({data, dimension}: Props) => {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 2500);
    }
  }, [copied]);

  return (
    <button className={clsx('button-clickable p-1', dimension ?? 'size-8')} onClick={() => {
      navigator.clipboard.writeText(data).then(() => setCopied(true));
    }}>
      {copied ? <CheckCircleIcon/> : <ClipboardIcon/>}
    </button>
  );
};
