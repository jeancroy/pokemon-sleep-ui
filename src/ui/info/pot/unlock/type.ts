import {PotInfoFilter, PotLevelInfo} from '@/ui/info/pot/type';


export type PotRecipeUnlockCommonProps = {
  filter: PotInfoFilter,
  potInfo: PotLevelInfo,
  cumulativeShardsRequirement: number,
};
