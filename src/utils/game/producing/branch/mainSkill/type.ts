import {ProducingRateCommonParams} from '@/types/game/producing/rate';
import {GetMainSkillEquivalentStrengthOpts} from '@/utils/game/mainSkill/effect/type';


export type GetMainSkillProducingRateBaseOpts =
  Omit<ProducingRateCommonParams, 'level'> &
  GetMainSkillEquivalentStrengthOpts & {
    skillRatePercent: number,
  };
