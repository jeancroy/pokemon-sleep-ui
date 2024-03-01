import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {usePathname} from '@/components/i18n/exports';
import {FlexLink} from '@/components/layout/flex/link';
import {NextImage} from '@/components/shared/common/image/main';
import {imageSmallIconSizes} from '@/styles/image';
import {NavEntryLink} from '@/types/website/nav';


type Props = {
  entry: NavEntryLink,
};

export const NavListEntryLink = ({entry}: Props) => {
  const {
    href,
    disabled,
    imageSrc,
    i18nTextId,
  } = entry;

  const t = useTranslations('UI.Metadata');
  const pathname = usePathname();

  const isCurrent = href === pathname;

  if (disabled) {
    return null;
  }

  const text = t(i18nTextId);

  return (
    <FlexLink
      href={isCurrent ? '#' : href}
      noFullWidth={false}
      className={clsx(
        'button-common-lg button-text items-center gap-2 p-2',
        isCurrent ? 'cursor-auto bg-slate-700/30 dark:bg-slate-300/30' : 'button-clickable group',
      )}
    >
      <div className="nav-height relative w-8 shrink-0">
        <NextImage
          src={imageSrc} alt={text} sizes={imageSmallIconSizes}
          className="invert-hoverable transform-smooth group-hover:scale-120 motion-reduce:transform-none"
        />
      </div>
      <div>
        {text}
      </div>
    </FlexLink>
  );
};
