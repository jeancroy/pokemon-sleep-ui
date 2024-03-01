import {NavEntryLink} from '@/types/website/nav';


export const navEntriesForSleepdex: NavEntryLink[] = [
  {
    type: 'link',
    href: '/sleepdex/record',
    imageSrc: '/images/generic/memo.png',
    i18nTextId: 'SleepStyle.Sleepdex.Record.Title',
  },
  {
    type: 'link',
    href: '/sleepdex/lookup',
    imageSrc: '/images/generic/search.png',
    i18nTextId: 'SleepStyle.Sleepdex.Lookup.Title',
  },
];
