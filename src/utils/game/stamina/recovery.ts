import {NatureId} from '@/types/game/pokemon/nature';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {StaminaRecoveryRateConfig} from '@/types/game/stamina/recovery';
import {toSum} from '@/utils/array';
import {getNatureMultiplier} from '@/utils/game/nature';
import {getSubSkillBonusValue} from '@/utils/game/subSkill/effect';


type ToRecoveryRateOpts = {
  subSkillBonus: GroupedSubSkillBonus | null,
  natureId: NatureId | null,
};

export const toRecoveryRate = ({subSkillBonus, natureId}: ToRecoveryRateOpts): StaminaRecoveryRateConfig => {
  return {
    general: getNatureMultiplier({id: natureId, effect: 'energy'}),
    sleep: toSum(getSubSkillBonusValue(subSkillBonus, 'stamina')) || 1,
  };
};
