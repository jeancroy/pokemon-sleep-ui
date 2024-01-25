import React from 'react';

import {NextImage} from '@/components/shared/common/image/main';
import {FeatureLink} from '@/components/shared/link/feature';
import {FeatureLinkImageProps} from '@/components/shared/link/type';
import {imageSmallIconSizes} from '@/styles/image';


type Props = FeatureLinkImageProps & {
  text: string,
};

export const FeatureLinkImage = ({imageSrc, ...props}: Props) => {
  const {disabled, text} = props;

  if (disabled) {
    return (
      <FeatureLink {...props}>
        <div className="relative size-12">
          <NextImage src={imageSrc} alt={text} className="invert-on-light" sizes={imageSmallIconSizes}/>
        </div>
      </FeatureLink>
    );
  }

  return (
    <FeatureLink {...props}>
      <div className="relative size-12">
        <NextImage src={imageSrc} alt={text} className="invert-hoverable" sizes={imageSmallIconSizes}/>
      </div>
    </FeatureLink>
  );
};
