import React from 'react';

import {I18nProvider} from '@/components/i18n/provider';
import {getEventDrowsyPowerMultiplierData} from '@/controller/event/drowsyPowerMultiplier';
import {getMapIds} from '@/controller/mapMeta';
import {getSleepStyleNormalFlattenedList} from '@/controller/sleepStyle';
import {getSleepStyleSpecialList} from '@/controller/sleepStyleSpecial';
import {getSnorlaxDataMap} from '@/controller/snorlax';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {SleepdexLookupClient} from '@/ui/sleepStyle/sleepdex/lookup/client';
import {SleepdexLookupServerDataProps} from '@/ui/sleepStyle/sleepdex/lookup/type';


export const SleepdexLookup = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  const [
    snorlaxDataMap,
    eventDrowsyPowerMultiplierData,
    mapIds,
    normal,
    special,
  ] = await Promise.all([
    getSnorlaxDataMap(),
    getEventDrowsyPowerMultiplierData(),
    getMapIds(),
    getSleepStyleNormalFlattenedList(),
    getSleepStyleSpecialList(),
  ]);

  const props: SleepdexLookupServerDataProps = {
    snorlaxDataMap,
    eventDrowsyPowerMultiplierData,
    mapIds,
    sleepStyles: {
      normal,
      special,
    },
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.Component.PokemonFilter',
        'UI.SleepStyle',
        'UI.Metadata',
        'UI.Multiplier',
        'UI.Pokemon',
      ]}>
        <SleepdexLookupClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
