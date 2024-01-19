import {PokedexTier} from '@/ui/pokedex/tier/result/type';


export const pokedexTierTextStyling: {[tier in PokedexTier]: string} = {
  S: 'text-violet-600 group-hover:text-violet-400 dark:text-violet-400 dark:group-hover:text-violet-600',
  A: 'text-blue-600 group-hover:text-blue-400 dark:text-blue-400 dark:group-hover:text-blue-600',
  B: 'text-teal-600 group-hover:text-teal-400 dark:text-teal-400 dark:group-hover:text-teal-600',
  C: 'text-green-600 group-hover:text-green-400 dark:text-green-400 dark:group-hover:text-green-600',
  D: 'text-amber-600 group-hover:text-amber-400 dark:text-amber-400 dark:group-hover:text-amber-600',
  E: 'text-orange-600 group-hover:text-orange-400 dark:text-orange-400 dark:group-hover:text-orange-600',
  F: 'text-rose-600 group-hover:text-rose-400 dark:text-rose-400 dark:group-hover:text-rose-600',
};

export const pokedexTierBackgroundStyling: {[tier in PokedexTier]: string} = {
  S: 'bg-violet-600 group-hover:bg-violet-400 dark:bg-violet-400 dark:group-hover:bg-violet-600',
  A: 'bg-blue-600 group-hover:bg-blue-400 dark:bg-blue-400 dark:group-hover:bg-blue-600',
  B: 'bg-teal-600 group-hover:bg-teal-400 dark:bg-teal-400 dark:group-hover:bg-teal-600',
  C: 'bg-green-600 group-hover:bg-green-400 dark:bg-green-400 dark:group-hover:bg-green-600',
  D: 'bg-amber-600 group-hover:bg-amber-400 dark:bg-amber-400 dark:group-hover:bg-amber-600',
  E: 'bg-orange-600 group-hover:bg-orange-400 dark:bg-orange-400 dark:group-hover:bg-orange-600',
  F: 'bg-rose-600 group-hover:bg-rose-400 dark:bg-rose-400 dark:group-hover:bg-rose-600',
};

export const pokedexTierBorderStyling: {[tier in PokedexTier]: `border-${string}`} = {
  S: 'border-violet-600 dark:border-violet-400',
  A: 'border-blue-600 dark:border-blue-400',
  B: 'border-teal-600 dark:border-teal-400',
  C: 'border-green-600 dark:border-green-400',
  D: 'border-amber-600 dark:border-amber-400',
  E: 'border-orange-600 dark:border-orange-400',
  F: 'border-rose-600 dark:border-rose-400',
};
