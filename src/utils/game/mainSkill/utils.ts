import {getSkillTriggerRateMultiplier, GetSkillTriggerRateMultiplierOpts} from '@/utils/game/mainSkill/multiplier';


type GetSkillTriggerRatePercentOpts = GetSkillTriggerRateMultiplierOpts & {
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
