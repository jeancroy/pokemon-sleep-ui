import React from 'react';

import pick from 'lodash/pick';
import {NextIntlClientProvider} from 'next-intl';

import {I18nNamespaces} from '@/types/i18n';
import {Locale} from '@/types/next/locale';
import {getMessages} from '@/utils/i18n';


type Props = {
  locale: Locale,
  namespaces: I18nNamespaces[],
};

export const I18nProvider = async ({locale, namespaces, children}: React.PropsWithChildren<Props>) => {
  const messages = await getMessages(locale);

  if (!messages) {
    return null;
  }

  return (
    // Default to attach ads messages
    <NextIntlClientProvider locale={locale} messages={pick(messages, 'UI.Subscription', ...namespaces)}>
      {children}
    </NextIntlClientProvider>
  );
};
