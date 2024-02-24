import {PotInfo} from '@/types/game/potInfo';
import {PotInfoFilter} from '@/ui/info/pot/type';


export type PotRecipeUnlockCommonProps = {
  filter: PotInfoFilter,
  potInfo: PotInfo,
  cumulativeShardsRequirement: number,
};
