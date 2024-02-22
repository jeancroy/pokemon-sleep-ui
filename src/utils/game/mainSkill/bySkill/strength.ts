import {MainSkillEffect} from '@/types/game/pokemon/mainSkill';


type GetMainSkillStrengthEffectOpts = {
  activeSkillEffect: MainSkillEffect | null,
};

export const getMainSkillStrengthEffect = ({activeSkillEffect}: GetMainSkillStrengthEffectOpts): number => {
  if (!activeSkillEffect || activeSkillEffect.type !== 'strength') {
    return 0;
  }

  if (activeSkillEffect.value) {
    return activeSkillEffect.value;
  }

  return ((activeSkillEffect.range?.from ?? 0) + (activeSkillEffect.range?.to ?? 0)) / 2;
};
