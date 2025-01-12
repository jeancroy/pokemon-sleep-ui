import React from 'react';


import {I18nProvider} from '@/components/i18n/provider';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {RatingClient} from '@/ui/rating/client';
import {RatingServerDataProps} from '@/ui/rating/type';
import {getOcrTranslationsForPokemonInfo} from '@/utils/ocr/translations/pokemon';


export const Rating = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    ocrTranslations,
  ] = await Promise.all([
    getOcrTranslationsForPokemonInfo(),
  ]);

  const props: RatingServerDataProps = {
    ocrTranslations,
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.Component.PokemonFilter',
        'UI.InPage.Rating',
        'UI.Metadata',
        'UI.Ocr',
        'UI.Pokemon',
        'UI.Rating',
      ]}>
        <RatingClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
