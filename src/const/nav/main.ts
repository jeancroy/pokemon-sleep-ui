import {navEntriesForCooking} from '@/const/nav/cooking';
import {navEntriesForInfo} from '@/const/nav/info';
import {navEntriesForItem} from '@/const/nav/item';
import {navEntriesForSleepStyle} from '@/const/nav/sleepStyle/main';
import {navEntriesForTeam} from '@/const/nav/team';
import {NavEntry} from '@/types/website/nav';


export const navEntries: NavEntry[] = [
  {
    type: 'link',
    href: '/pokedex',
    imageSrc: '/images/generic/pokeball.png',
    i18nTextId: 'Pokedex.Main.Index.Title',
  },
  {
    type: 'link',
    href: '/pokedex/tier',
    imageSrc: '/images/generic/rank.png',
    i18nTextId: 'Pokedex.Tier.Title',
  },
  {
    type: 'link',
    href: '/docs',
    imageSrc: '/images/generic/memo.png',
    i18nTextId: 'Docs.Index.Title',
  },
  {
    type: 'link',
    href: '/rating',
    imageSrc: '/images/generic/search.png',
    i18nTextId: 'Rating.Title',
  },
  {
    type: 'link',
    href: '/production',
    imageSrc: '/images/generic/analysis.png',
    i18nTextId: 'Production.Title',
  },
  {
    type: 'group',
    href: '/sleepstyle',
    imageSrc: '/images/generic/sleep.png',
    i18nTextId: 'SleepStyle.Index.Title',
    entries: navEntriesForSleepStyle,
  },
  {
    type: 'group',
    href: '/cooking',
    imageSrc: '/images/generic/pot.png',
    i18nTextId: 'Cooking.Index.Title',
    entries: navEntriesForCooking,
  },
  {
    type: 'group',
    href: '/team',
    imageSrc: '/images/generic/team.png',
    i18nTextId: 'Team.Index.Title',
    entries: navEntriesForTeam,
  },
  {
    type: 'link',
    href: '/berry',
    imageSrc: '/images/generic/berry.png',
    i18nTextId: 'Berry.Index.Title',
  },
  {
    type: 'link',
    href: '/ingredient',
    imageSrc: '/images/generic/ingredient.png',
    i18nTextId: 'Ingredient.Index.Title',
  },
  {
    type: 'group',
    href: '/info',
    imageSrc: '/images/generic/info.png',
    i18nTextId: 'Info.Index.Title',
    entries: navEntriesForInfo,
  },
  {
    type: 'link',
    href: '/xp',
    imageSrc: '/images/generic/candyWhite.png',
    i18nTextId: 'PokemonExp.Title',
  },
  {
    type: 'link',
    href: '/energy',
    imageSrc: '/images/generic/mood.png',
    i18nTextId: 'Stamina.Title',
  },
  {
    type: 'group',
    href: '/item',
    imageSrc: '/images/generic/bag.png',
    i18nTextId: 'Item.Index.Title',
    entries: navEntriesForItem,
  },
  {
    type: 'link',
    href: '/about',
    imageSrc: '/images/generic/globe.png',
    i18nTextId: 'About.Title',
  },
];
