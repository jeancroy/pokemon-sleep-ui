import {GetPokemonProducingRateBaseOpts} from '@/utils/game/producing/main/base';
import {GetProducingRateSharedOpts} from '@/utils/game/producing/type';
import {Nullable} from '@/utils/type';


export type GetPokemonProducingRateOpts = Omit<
  GetPokemonProducingRateBaseOpts,
  keyof GetProducingRateSharedOpts | 'helpingBonusEffect' | 'calculatedSettings'
> & {
  alwaysFullPack?: Nullable<boolean>,
};

export type GetPokemonProducingRateOptsWithPayload<TPayload> = {
  opts: GetPokemonProducingRateOpts,
  payload: TPayload,
};
