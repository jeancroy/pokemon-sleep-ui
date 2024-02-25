import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {GetStaminaEventLogOpts} from '@/utils/game/stamina/log/type';


export const getStaminaEventLogsEffectiveSkillTriggers = ({
  config,
  skillTriggerOverride,
}: GetStaminaEventLogOpts): StaminaSkillTriggerData[] => {
  const {skillRecovery} = config;

  if (skillTriggerOverride === null) {
    return [];
  }

  if (!skillTriggerOverride) {
    return [skillRecovery.recovery];
  }

  const {type, triggers} = skillTriggerOverride;

  if (type === 'override') {
    return triggers;
  }

  if (type === 'attach') {
    return [skillRecovery.recovery, ...triggers];
  }

  throw new Error(`Unhandled skill trigger override type [${type satisfies never}]`);
};
