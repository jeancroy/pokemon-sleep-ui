import {navEntriesForSleepdex} from '@/const/nav/sleepStyle/sleepdex';
import {NavEntry} from '@/types/website/nav';


export const navEntriesForSleepStyle: NavEntry[] = [
  {
    type: 'link',
    href: '/map',
    imageSrc: '/images/generic/map.png',
    i18nTextId: 'SleepStyle.Map.Index.Title',
  },
  {
    type: 'link',
    href: '/map/unique',
    imageSrc: '/images/generic/map.png',
    i18nTextId: 'SleepStyle.UniqueMap.Index.Title',
  },
  {
    type: 'link',
    href: '/sleepstyle/special',
    imageSrc: '/images/generic/incense.png',
    i18nTextId: 'SleepStyle.Special.Title',
  },
  {
    type: 'group',
    href: '/sleepdex',
    imageSrc: '/images/generic/sleep.png',
    i18nTextId: 'SleepStyle.Sleepdex.Index.Title',
    entries: navEntriesForSleepdex,
  },
];
