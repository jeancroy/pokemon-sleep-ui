import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {ProductionCalcBehavior} from '@/types/game/producing/behavior/type';
import {ProductionPeriod} from '@/types/game/producing/display';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {ConfigRequiredData} from '@/types/userData/config/data';
import {GetPokemonProductionUnitOpts} from '@/utils/game/producing/main/unit/type';
import {Nullable} from '@/utils/type';


export type GetPokemonProductionOpts = Omit<
  GetPokemonProductionUnitOpts,
  keyof GetPokemonProductionSharedOpts | 'helpingBonusEffect' | 'calculatedUserConfig'
> & {
  alwaysFullPack?: Nullable<boolean>,
};

export type GetPokemonProductionSharedOpts = ConfigRequiredData & {
  bundle: ConfigBundle,
  snorlaxFavorite: SnorlaxFavorite,
  period?: ProductionPeriod,
  calcBehavior?: ProductionCalcBehavior,
  subSkillBonusOverride?: GroupedSubSkillBonus[],
};

export type GetPokemonProductionUnitOptsWithPayload<TPayload> = {
  opts: GetPokemonProductionOpts,
  payload: TPayload,
};
