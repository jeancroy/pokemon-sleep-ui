import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {ProducingRateCalcBehavior} from '@/types/game/producing/behavior.ts/type';
import {ProductionPeriod} from '@/types/game/producing/display';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {UserSettingsBundle, UserSettingsRequiredData} from '@/types/userData/settings/main';
import {GetPokemonProducingRateBaseOpts} from '@/utils/game/producing/main/base/type';
import {Nullable} from '@/utils/type';


export type GetPokemonProducingRateOpts = Omit<
  GetPokemonProducingRateBaseOpts,
  keyof GetProducingRateSharedOpts | 'helpingBonusEffect' | 'calculatedSettings'
> & {
  alwaysFullPack?: Nullable<boolean>,
};

export type GetProducingRateSharedOpts = UserSettingsRequiredData & {
  bundle: UserSettingsBundle,
  snorlaxFavorite: SnorlaxFavorite,
  period?: ProductionPeriod,
  calcBehavior?: ProducingRateCalcBehavior,
  subSkillBonusOverride?: GroupedSubSkillBonus[],
};

export type GetPokemonProducingRateOptsWithPayload<TPayload> = {
  opts: GetPokemonProducingRateOpts,
  payload: TPayload,
};
