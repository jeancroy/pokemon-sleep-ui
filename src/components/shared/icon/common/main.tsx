import React from 'react';

import {clsx} from 'clsx';

import {NextImage} from '@/components/shared/common/image/main';
import {GenericIconCommonProps} from '@/components/shared/icon/common/type';
import {imageSmallIconSizes} from '@/styles/image';


export const GenericIcon = ({
  alt,
  noInvert,
  noShrink,
  isActive,
  dropShadow,
  className,
  dimension,
  noWrap,
  src,
}: GenericIconCommonProps) => {
  const imageClassName = clsx(
    // The inversion should only be active when `isActive` is explicitly used by supplying boolean value
    // Therefore `isActive` is getting explicit check
    isActive !== undefined && (isActive ? 'invert-on-dark' : 'invert-on-light'),
    dropShadow && 'drop-shadow-thick',
    isActive === undefined && !noInvert && 'invert-hoverable',
    noShrink && 'shrink-0',
    className,
  );

  if (noWrap) {
    return (
      <NextImage src={src} alt={alt} sizes={imageSmallIconSizes} className={imageClassName}/>
    );
  }

  return (
    <div className={clsx('relative', dimension ?? 'size-5', noShrink && 'shrink-0')}>
      <NextImage src={src} alt={alt} sizes={imageSmallIconSizes} className={imageClassName}/>
    </div>
  );
};
