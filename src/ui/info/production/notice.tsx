import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {MarkdownContent} from '@/components/markdown/main';


export const ProducingParamsNotice = () => {
  const t = useTranslations('UI.InPage.ProducingParams');

  return (
    <Flex className="rounded-lg p-1.5 shadow-border dark:shadow-slate-300">
      <MarkdownContent>
        {t('Notice')}
      </MarkdownContent>
    </Flex>
  );
};
