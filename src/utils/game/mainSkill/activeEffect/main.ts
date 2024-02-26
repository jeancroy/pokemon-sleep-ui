import {MainSkillEffect} from '@/types/game/pokemon/mainSkill';
import {GetMainSkillActiveEffectOpts} from '@/utils/game/mainSkill/activeEffect/type';


export const getMainSkillActiveEffect = ({
  skillLevel,
  skillData,
}: GetMainSkillActiveEffectOpts): MainSkillEffect | null => {
  return skillData.effects[skillLevel - 1];
};
