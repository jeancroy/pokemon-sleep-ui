import {ItemPack} from '@/types/game/item';
import {SnorlaxRank} from '@/types/game/rank';


export type MissionTarget = {
  mission: 'rank',
  rank: SnorlaxRank,
} | {
  mission: (
    'cook' |
    'berry' |
    'berryFavorite' |
    'onBedTime' |
    'catchPokemon' |
    'useBiscuit' |
    'useCandy' |
    'useIncense'
  ),
  count: number,
};

export type MissionType = MissionTarget['mission'];

export type Mission = MissionTarget & {
  internalId: number,
  reward: ItemPack,
};
