import {ItemPack} from '@/types/game/item';


export type ResearchRankData = {
  rank: number,
  toNext: number,
  accumulated: number,
  pokemonMaxLevel: number,
  dreamClusterBase: number,
  rewards: ItemPack[],
};
