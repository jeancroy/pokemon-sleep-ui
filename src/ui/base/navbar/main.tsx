import React from 'react';


import {Announcements} from '@/components/announcement/main';
import {I18nProvider} from '@/components/i18n/provider';
import {NavBarClient} from '@/ui/base/navbar/client';
import {NavBarCommonProps} from '@/ui/base/navbar/type';


type Props = NavBarCommonProps & {
  announcement: boolean,
};

export const NavBar = ({noUserControl, locale, announcement}: Props) => {
  return (
    <I18nProvider locale={locale} namespaces={[
      'Game',
      'UI.Common',
      'UI.Component.PokemonFilter',
      'UI.InPage.Cooking',
      'UI.Metadata',
      'UI.Multiplier',
      'UI.Pokemon',
      'UI.Stamina',
      'UI.UserConfig',
      'UI.UserControl',
    ]}>
      <NavBarClient noUserControl={noUserControl}>
        {announcement && <Announcements showOn="landscape"/>}
      </NavBarClient>
    </I18nProvider>
  );
};
