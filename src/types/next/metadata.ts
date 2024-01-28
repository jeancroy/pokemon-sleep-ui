import {Metadata} from 'next';

import {PageParams} from '@/types/next/page/common';


export type GenerateMetadataParams = PageParams;

export type GenerateMetadataOpts<P extends GenerateMetadataParams> = {
  params: P,
};

export type GenerateMetadata<
  T extends GenerateMetadataParams = GenerateMetadataParams,
> = (
  opts: GenerateMetadataOpts<T>,
) => Promise<Metadata>;

export type GeneratePageMetaValues = {
  name: string,
};
