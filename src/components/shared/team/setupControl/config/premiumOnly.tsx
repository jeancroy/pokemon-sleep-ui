import React from 'react';

import {useTranslations} from 'next-intl';

import {MarkdownContent} from '@/components/markdown/main';


export const TeamUserConfigPremiumUserOnly = () => {
  const t = useTranslations('UI.Component.Team.SetupControl');

  return (
    <MarkdownContent className="rounded-lg bg-amber-400/40 p-3 text-center dark:bg-amber-500/20">
      {t('Message.PremiumOnly')}
    </MarkdownContent>
  );
};
