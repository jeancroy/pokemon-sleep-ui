import React from 'react';

import {pick} from 'lodash';
import {NextIntlClientProvider} from 'next-intl';

import {getMessages} from '@/i18n';
import {I18nNamespaces} from '@/types/i18n';
import {Locale} from '@/types/next/locale';


type Props = {
  locale: Locale,
  namespaces: I18nNamespaces[],
};

export const I18nProvider = async ({locale, namespaces, children}: React.PropsWithChildren<Props>) => {
  const messages = await getMessages(locale);

  if (!messages) {
    return <></>;
  }

  return (
    <NextIntlClientProvider locale={locale} messages={pick(messages, ...namespaces)}>
      {children}
    </NextIntlClientProvider>
  );
};
