import {NavEntryLink} from '@/types/website/nav';


export const navEntriesForCooking: NavEntryLink[] = [
  {
    type: 'link',
    href: '/meal',
    imageSrc: '/images/generic/meal.png',
    i18nTextId: 'Meal.Index.Title',
  },
  {
    type: 'link',
    href: '/cooking/make',
    imageSrc: '/images/generic/pot.png',
    i18nTextId: 'Cooking.Make.Title',
  },
  {
    type: 'link',
    href: '/cooking/prepare',
    imageSrc: '/images/generic/ingredient.png',
    i18nTextId: 'Cooking.Prepare.Title',
  },
];
