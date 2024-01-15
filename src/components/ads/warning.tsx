import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import {isProduction} from '@/utils/environment';


type Props = {
  hide?: boolean,
};

export const AdBlockWarning = ({hide}: Props) => {
  const t = useTranslations('UI.Subscription');

  if (hide) {
    return null;
  }

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} className={clsx(
      'flex h-full w-full flex-col items-center justify-center p-2 text-center text-xl',
      isProduction() ? 'rounded-lg bg-red-500/50 py-1' : 'border border-green-500',
    )}>
      {t('AdBlockActive')}
    </ReactMarkdown>
  );
};
