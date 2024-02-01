import React from 'react';

import {getServerSession} from 'next-auth';

import {I18nProvider} from '@/components/i18n/provider';
import {Failed} from '@/components/icons/failed';
import {Flex} from '@/components/layout/flex/common';
import {MapUniqueWarning} from '@/components/shared/sleepStyle/common/uniqueWarning';
import {MapPageClient} from '@/components/shared/sleepStyle/page/client';
import {MapPageServerDataProps} from '@/components/shared/sleepStyle/page/type';
import {authOptions} from '@/const/auth';
import {getIngredientMap} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getMapMeta} from '@/controller/mapMeta';
import {getPokedexMap} from '@/controller/pokemon/info';
import {getSleepdexMap} from '@/controller/sleepdex';
import {getSnorlaxDataOfMap} from '@/controller/snorlax';
import {SleepStyleNormalFlattened} from '@/types/game/sleepStyle';
import {Locale} from '@/types/next/locale';
import {toUnique} from '@/utils/array';


type Props = {
  locale: Locale,
  mapId: number,
  getDataPromise: (mapId: number) => Promise<SleepStyleNormalFlattened[]>,
  isUnique?: boolean,
};

export const MapPage = async ({locale, mapId, getDataPromise, isUnique}: Props) => {
  const session = await getServerSession(authOptions);

  const sleepStyles = await getDataPromise(mapId);
  const [
    pokedexMap,
    ingredientMap,
    ingredientChainMap,
    snorlaxData,
    mapMeta,
    sleepdexMap,
  ] = await Promise.all([
    getPokedexMap(toUnique(sleepStyles.map(({pokemonId}) => pokemonId))),
    getIngredientMap(),
    getIngredientChainMap(),
    getSnorlaxDataOfMap(mapId),
    getMapMeta(mapId),
    getSleepdexMap(session?.user.id),
  ]);

  if (!snorlaxData) {
    return <Failed text="Snorlax"/>;
  }

  const props: MapPageServerDataProps = {
    mapId,
    sleepStyles,
    pokedexMap,
    ingredientMap,
    ingredientChainMap,
    snorlaxData,
    mapMeta,
    sleepdexMap,
    isLoggedIn: !!session,
  };

  return (
    <Flex className="gap-1.5 self-center md:w-3/4">
      {isUnique && <MapUniqueWarning/>}
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.InPage.Pokedex.Info',
        'UI.InPage.Pokedex.Input',
        'UI.InPage.Map',
        'UI.Common',
        'UI.Metadata',
      ]}>
        <MapPageClient locale={locale} {...props}/>
      </I18nProvider>
    </Flex>
  );
};
