'use client';
import React from 'react';

import {useTranslations} from 'next-intl';

import {AdsUnit} from '@/components/ads/main';
import {useMapFilter} from '@/components/shared/sleepStyle/page/hook';
import {MapInfoInput} from '@/components/shared/sleepStyle/page/input/main';
import {MapMeta} from '@/components/shared/sleepStyle/page/meta';
import {MapPageServerDataProps} from '@/components/shared/sleepStyle/page/type';
import {MapUnlockTable} from '@/components/shared/sleepStyle/page/unlockTable/main';
import {Locale} from '@/types/next/locale';


type Props = MapPageServerDataProps & {
  locale: Locale,
};

export const MapPageClient = ({locale, ...props}: Props) => {
  const {mapId, sleepdexMap} = props;

  const t = useTranslations('Game.Field');
  const mapName = t(mapId.toString());

  const {filter, setFilter, isIncluded} = useMapFilter({
    mapName,
    ...props,
  });
  const [sleepdex, setSleepdex] = React.useState(sleepdexMap);

  return (
    <>
      <MapMeta {...props} mapName={mapName} sleepdexMap={sleepdex}/>
      <AdsUnit/>
      <MapInfoInput filter={filter} setFilter={setFilter} mapName={mapName} {...props}/>
      <AdsUnit hideIfNotBlocked/>
      <MapUnlockTable
        filter={filter}
        isIncluded={isIncluded}
        sleepdex={sleepdex}
        setSleepdex={setSleepdex}
        {...props}
      />
    </>
  );
};
