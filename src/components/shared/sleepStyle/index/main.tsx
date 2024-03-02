import React from 'react';

import {getServerSession} from 'next-auth';

import {MapIndexContent} from '@/components/shared/sleepStyle/index/content';
import {MapIndexServerDataProps} from '@/components/shared/sleepStyle/index/type';
import {authOptions} from '@/const/auth';
import {getFieldMetaMap} from '@/controller/mapMeta';
import {getSleepdexMap} from '@/controller/sleepdex';
import {FieldToFlattenedSleepStyleMap} from '@/types/game/sleepStyle';


type Props = {
  getDataPromise: () => Promise<FieldToFlattenedSleepStyleMap>,
  isUnique?: boolean,
};

export const MapIndex = async ({getDataPromise, isUnique}: Props) => {
  const session = await getServerSession(authOptions);

  const [
    data,
    sleepdexMap,
    fieldMetaMap,
  ] = await Promise.all([
    getDataPromise(),
    getSleepdexMap(session?.user.id),
    getFieldMetaMap(),
  ]);

  const props: MapIndexServerDataProps = {
    data,
    sleepdexMap,
    fieldMetaMap,
    isLoggedIn: !!session,
    isUnique,
  };

  return <MapIndexContent {...props}/>;
};
