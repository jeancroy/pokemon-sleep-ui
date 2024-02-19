import {BerryData} from '@/types/game/berry';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {ProducingRateCommonParams} from '@/types/game/producing/rate';
import {SnorlaxFavorite} from '@/types/game/snorlax';


export type GetBerryProducingRateBaseOpts = ProducingRateCommonParams & {
  subSkillBonus: GroupedSubSkillBonus | null,
  snorlaxFavorite: SnorlaxFavorite,
  berryData: BerryData,
};
