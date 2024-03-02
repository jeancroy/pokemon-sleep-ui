import React from 'react';

import {BerryPageParams} from '@/app/[locale]/berry/[id]/page';
import {I18nProvider} from '@/components/i18n/provider';
import {Failed} from '@/components/icons/failed';
import {getBerryData} from '@/controller/berry';
import {getFavoriteInfoOfBerry} from '@/controller/mapMeta';
import {getPokemonByBerry} from '@/controller/pokemon/info';
import {getPokemonIngredientProductionByBerry} from '@/controller/pokemon/ingredient';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {BerryPageClient} from '@/ui/berry/page/client';
import {BerryPageDataProps} from '@/ui/berry/page/type';


type Props = {
  params: BerryPageParams,
};

export const BerryPage = async ({params}: Props) => {
  const {id, locale} = params;
  const idNumber = parseInt(id);

  const [
    pokemonIngredientProduction,
    pokemonOfBerry,
    berryData,
    favoriteInfo,
  ] = await Promise.all([
    getPokemonIngredientProductionByBerry(idNumber),
    getPokemonByBerry(idNumber),
    getBerryData(idNumber),
    getFavoriteInfoOfBerry(idNumber),
  ]);

  if (!berryData) {
    return <Failed text="Berry"/>;
  }

  const props: BerryPageDataProps = {
    pokemonIngredientProduction,
    pokemonOfBerry,
    berryData,
    favoriteInfo,
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.Pokemon',
        'UI.Metadata',
      ]}>
        <BerryPageClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
