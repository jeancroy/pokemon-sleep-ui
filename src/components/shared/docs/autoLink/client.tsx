'use client';
import React from 'react';

import QuestionMarkCircleIcon from '@heroicons/react/24/solid/QuestionMarkCircleIcon';
import {useTranslations} from 'next-intl';

import {usePathname} from '@/components/i18n/exports';
import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {DocsAutoLinkPopup} from '@/components/shared/docs/autoLink/popup';
import {getDocsRelatedFromApi} from '@/const/api/docs';
import {DocsMetadata} from '@/types/mongo/docs';
import {Locale} from '@/types/next/locale';


type Props = {
  locale: Locale,
};

export const DocsAutoLinkClient = ({locale}: Props) => {
  const path = usePathname();
  const [metaList, setMetaList] = React.useState<DocsMetadata[]>([]);
  const [show, setShow] = React.useState(false);

  const t = useTranslations('UI.Root');

  React.useEffect(() => {
    // `.slice(1)` because `related` of `DocsData` do not store heading slash (/),
    // but `usePathname()` always return the path starting with slash.
    getDocsRelatedFromApi(new URLSearchParams({
      path: path.slice(1),
      locale,
    })).then(setMetaList);
  }, []);

  return (
    <AnimatedCollapseQuick show={!!metaList.length}>
      <PopupCommon show={show} setShow={setShow}>
        <DocsAutoLinkPopup metaList={metaList}/>
      </PopupCommon>
      <Flex className="items-end">
        <FlexButton className="button-clickable-bg gap-1 !rounded-full p-1 px-2" onClick={() => setShow(true)}>
          <QuestionMarkCircleIcon className="size-6 shrink-0"/>
          <span>{t('Help')}</span>
        </FlexButton>
      </Flex>
    </AnimatedCollapseQuick>
  );
};
