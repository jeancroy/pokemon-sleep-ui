import {
  pokedexSortExclusion,
  PokedexSortExclusion,
} from '@/components/shared/pokemon/sorter/type';


export const isPokedexSortExclusion = (sort: string): sort is PokedexSortExclusion => {
  return pokedexSortExclusion.includes(sort as PokedexSortExclusion);
};
