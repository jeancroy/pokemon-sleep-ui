import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {ProductionCalcBehavior} from '@/types/game/producing/behavior/type';
import {ProductionPeriod} from '@/types/game/producing/display';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {ConfigRequiredData} from '@/types/userData/config/data';
import {GetPokemonProducingRateUnitOpts} from '@/utils/game/producing/main/unit/type';
import {Nullable} from '@/utils/type';


export type GetPokemonProducingRateOpts = Omit<
  GetPokemonProducingRateUnitOpts,
  keyof GetProducingRateSharedOpts | 'helpingBonusEffect' | 'calculatedUserConfig'
> & {
  alwaysFullPack?: Nullable<boolean>,
};

export type GetProducingRateSharedOpts = ConfigRequiredData & {
  bundle: ConfigBundle,
  snorlaxFavorite: SnorlaxFavorite,
  period?: ProductionPeriod,
  calcBehavior?: ProductionCalcBehavior,
  subSkillBonusOverride?: GroupedSubSkillBonus[],
};

export type GetPokemonProducingRateUnitOptsWithPayload<TPayload> = {
  opts: GetPokemonProducingRateOpts,
  payload: TPayload,
};
