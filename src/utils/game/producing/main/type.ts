import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {ProducingRateCalcBehavior} from '@/types/game/producing/behavior.ts/type';
import {ProductionPeriod} from '@/types/game/producing/display';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {ConfigRequiredData} from '@/types/userData/config/data';
import {GetPokemonProducingRateBaseOpts} from '@/utils/game/producing/main/base/type';
import {Nullable} from '@/utils/type';


export type GetPokemonProducingRateOpts = Omit<
  GetPokemonProducingRateBaseOpts,
  keyof GetProducingRateSharedOpts | 'helpingBonusEffect' | 'calculatedUserConfig'
> & {
  alwaysFullPack?: Nullable<boolean>,
};

export type GetProducingRateSharedOpts = ConfigRequiredData & {
  bundle: ConfigBundle,
  snorlaxFavorite: SnorlaxFavorite,
  period?: ProductionPeriod,
  calcBehavior?: ProducingRateCalcBehavior,
  subSkillBonusOverride?: GroupedSubSkillBonus[],
};

export type GetPokemonProducingRateOptsWithPayload<TPayload> = {
  opts: GetPokemonProducingRateOpts,
  payload: TPayload,
};
