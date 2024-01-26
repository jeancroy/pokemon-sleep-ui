import React from 'react';

import {useSession} from 'next-auth/react';

import {AdsUnit} from '@/components/ads/main';
import {AdsPopupText} from '@/components/ads/popup/text';
import {Flex} from '@/components/layout/flex/common';
import {DocsMetaCard} from '@/components/shared/docs/card';
import {DiscordLink} from '@/components/static/discord/link';
import {DocsMetadata} from '@/types/mongo/docs';
import {isAdsShouldShow} from '@/utils/environment';


type Props = {
  metaList: DocsMetadata[],
};

export const DocsAutoLinkPopup = ({metaList}: Props) => {
  const {data} = useSession();

  return (
    <Flex className="gap-1.5 md:w-[60vw] lg:w-[50vw]">
      <AdsUnit/>
      {isAdsShouldShow(data) && <AdsPopupText/>}
      <Flex direction="row" className="justify-end">
        <DiscordLink className="button-clickable-glow size-9"/>
      </Flex>
      {metaList.map((metadata) => <DocsMetaCard key={metadata.path} metadata={metadata}/>)}
    </Flex>
  );
};
