import React from 'react';

import {clsx} from 'clsx';

import {NextImage} from '@/components/shared/common/image/main';
import {GenericIconCommonProps} from '@/components/shared/icon/common/type';
import {imageSmallIconSizes} from '@/styles/image';


export const GenericIcon = ({alt, className, dimension, noWrap, src, noInvert}: GenericIconCommonProps) => {
  const imageClassName = className ?? (noInvert ? '' : 'invert-hoverable');

  if (noWrap) {
    return (
      <NextImage src={src} alt={alt} sizes={imageSmallIconSizes} className={imageClassName}/>
    );
  }

  return (
    <div className={clsx('relative', dimension ?? 'h-5 w-5')}>
      <NextImage src={src} alt={alt} sizes={imageSmallIconSizes} className={imageClassName}/>
    </div>
  );
};