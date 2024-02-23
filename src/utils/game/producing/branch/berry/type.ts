import {BerryData} from '@/types/game/berry';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {ProductionCommonParams} from '@/types/game/producing/rate/params';
import {SnorlaxFavorite} from '@/types/game/snorlax';


export type GetBerryProductionBaseOpts = ProductionCommonParams & {
  subSkillBonus: GroupedSubSkillBonus | null,
  snorlaxFavorite: SnorlaxFavorite,
  berryData: BerryData,
};
