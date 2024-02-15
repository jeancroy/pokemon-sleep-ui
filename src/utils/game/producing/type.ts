import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {ProductionPeriod} from '@/types/game/producing/display';
import {ProducingRateOfItemOfSessions} from '@/types/game/producing/rate';
import {ProducingSleepStateSplit} from '@/types/game/producing/split';
import {ProduceType} from '@/types/game/producing/type';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {UserSettingsBundle, UserSettingsRequiredData} from '@/types/userData/settings/main';


export type GetItemRateOfSessionCommonOpts = {
  period: ProductionPeriod,
  rate: ProducingRateOfItemOfSessions,
  produceType: ProduceType,
};

export type GetSpecificItemRateOfSessionCommonOpts = GetItemRateOfSessionCommonOpts & {
  produceItemSplit: number,
  sleepStateSplit: ProducingSleepStateSplit,
};

export type GetProducingRateSharedOpts = UserSettingsRequiredData & {
  bundle: UserSettingsBundle,
  snorlaxFavorite: SnorlaxFavorite,
  period?: ProductionPeriod,
  calcBehavior?: ProducingRateCalcBehavior,
  subSkillBonusOverride?: GroupedSubSkillBonus[],
};

export type ProducingRateCalcBehavior = {
  asSingle?: boolean,
};
