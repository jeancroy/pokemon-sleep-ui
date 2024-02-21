import {ProducingRateCommonParams} from '@/types/game/producing/rate/params';
import {GetMainSkillStrengthEffectOpts} from '@/utils/game/mainSkill/bySkill/strength';


export type GetMainSkillProducingRateBaseOpts =
  Omit<ProducingRateCommonParams, 'level'> &
  GetMainSkillStrengthEffectOpts & {
    skillRatePercent: number,
  };
