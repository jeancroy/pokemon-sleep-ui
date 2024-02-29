import {NavEntryLink} from '@/types/nav';


export const navEntriesForTeam: NavEntryLink[] = [
  {
    type: 'link',
    href: '/team/box',
    imageSrc: '/images/generic/bag.png',
    i18nTextId: 'Team.Box.Title',
  },
  {
    type: 'link',
    href: '/team/analysis',
    imageSrc: '/images/generic/pokeball.png',
    i18nTextId: 'Team.Analysis.Title',
  },
  {
    type: 'link',
    href: '/team/maker',
    imageSrc: '/images/generic/wrenches.png',
    i18nTextId: 'Team.Maker.Title',
  },
];
