'use client';
import React from 'react';

import {NavEntry} from '@/types/website/nav';
import {NavListEntryGroup} from '@/ui/base/navbar/list/entry/group';
import {NavListEntryLink} from '@/ui/base/navbar/list/entry/link';


type Props = {
  entry: NavEntry,
};

export const NavListEntry = ({entry}: Props) => {
  const {type} = entry;

  if (type === 'link') {
    return <NavListEntryLink entry={entry}/>;
  }

  if (type === 'group') {
    return <NavListEntryGroup entry={entry}/>;
  }

  console.error(`Unhandled nav entry type [${type satisfies never}]`);
};
