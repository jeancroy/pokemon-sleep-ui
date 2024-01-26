import React from 'react';

import ExclamationCircleIcon from '@heroicons/react/24/outline/ExclamationCircleIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';


export const MapUniqueWarning = () => {
  const t = useTranslations('UI.InPage.Map');

  return (
    <Flex center className={clsx(
      'gap-1 rounded-lg py-7 text-2xl text-amber-600 shadow-border shadow-amber-600',
      'dark:text-amber-400 dark:shadow-amber-400 lg:flex-row',
    )}>
      <ExclamationCircleIcon className="size-8"/>
      <div>{t('Unique')}</div>
    </Flex>
  );
};
