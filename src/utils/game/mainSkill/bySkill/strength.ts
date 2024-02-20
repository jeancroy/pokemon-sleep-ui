import {getMainSkillActiveEffect} from '@/utils/game/mainSkill/activeEffect/main';
import {GetMainSkillActiveEffectOpts} from '@/utils/game/mainSkill/activeEffect/type';


export type GetMainSkillStrengthEffectOpts = GetMainSkillActiveEffectOpts;

export const getMainSkillStrengthEffect = (opts: GetMainSkillStrengthEffectOpts): number => {
  const effect = getMainSkillActiveEffect(opts);
  if (!effect || effect.type !== 'strength') {
    return 0;
  }

  if (effect.value) {
    return effect.value;
  }

  return ((effect.range?.from ?? 0) + (effect.range?.to ?? 0)) / 2;
};
