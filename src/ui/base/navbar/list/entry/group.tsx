import React from 'react';

import {useTranslations} from 'next-intl';

import {CollapsibleFull} from '@/components/layout/collapsible/full';
import {useCollapsibleControl} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {imageSmallIconSizes} from '@/styles/image';
import {NavEntryGroup} from '@/types/website/nav';
import {NavListEntry} from '@/ui/base/navbar/list/entry/main';


type Props = {
  entry: NavEntryGroup,
};

export const NavListEntryGroup = ({entry}: Props) => {
  const {
    imageSrc,
    i18nTextId,
    entries,
  } = entry;

  const collapsible = useCollapsibleControl();
  const t = useTranslations('UI.Metadata');

  const text = t(i18nTextId);

  return (
    <CollapsibleFull control={collapsible} classDuration="duration-300" classDelay="delay-200" button={
      <Flex direction="row" className="group items-center gap-2 p-1.5">
        <div className="nav-height relative w-8 shrink-0">
          <NextImage
            src={imageSrc} alt={text} sizes={imageSmallIconSizes}
            className="invert-hoverable transform-smooth group-hover:scale-120 motion-reduce:transform-none"
          />
        </div>
        <div>
          {text}
        </div>
      </Flex>
    }>
      {entries.map((entry) => <NavListEntry key={entry.i18nTextId} entry={entry}/>)}
    </CollapsibleFull>
  );
};
