import {ProductionSingleParams} from '@/types/game/producing/rate/params';
import {getSkillTriggerRateMultiplier} from '@/utils/game/mainSkill/multiplier';


type GetSkillTriggerRatePercentOpts = ProductionSingleParams & {
  baseSkillRatePercent: number | null,
};

export const getSkillTriggerRatePercent = ({
  baseSkillRatePercent,
  ...opts
}: GetSkillTriggerRatePercentOpts): number => {
  if (!baseSkillRatePercent) {
    return 0;
  }

  return baseSkillRatePercent * getSkillTriggerRateMultiplier(opts);
};
