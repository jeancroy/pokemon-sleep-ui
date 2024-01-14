import {ItemPack} from '@/types/game/item';
import {SleepMapId} from '@/types/game/sleepStyle';


export type GameFeature = 'levelUp' | 'cookRecipe' | 'potExpand';

export type GameProgressData = {
  sleepStyleUnlocksRequired: number,
  mapUnlock: SleepMapId | null,
  maxMapBonusPercent: number,
  maxPotLevel: number,
  featureUnlock: GameFeature | null,
  rewardDiamonds: number,
  rewardItems: ItemPack[],
};
